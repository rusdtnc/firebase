import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import {
  CompetitionDetail, CompetitionEquipe, CompetitionPhase, Journee, JourneeEquipe,
  JourneeRencontre
} from './competition';
import { Model, ModelFactory } from 'ngx-model';
import { CompetitionBouchonService } from './competition.bouchon.service';
import { distinctUntilChanged, map } from 'rxjs/internal/operators';
import { Single } from '../utils/graph';
import { DetailCompetitionResolver } from './competition.resolver';


export interface Competition {
  equipesMasculines: CompetitionEquipe[],
  equipesFeminines: CompetitionEquipe[],
  equipesMasculinesPlus: CompetitionEquipe[],
  equipesFemininesPlus: CompetitionEquipe[],
  detailCompetition: CompetitionDetail;
}

const initialState: Competition = {
  equipesMasculines: null,
  equipesFeminines: null,
  equipesMasculinesPlus: null,
  equipesFemininesPlus: null,
  detailCompetition: null
}

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  bouchon = true;

  private competition: Model<Competition>;

  competition$: Observable<Competition>;
  equipesMasculines$: Observable<CompetitionEquipe[]>;
  equipesFeminines$: Observable<CompetitionEquipe[]>;
  equipesMasculinesPlus$: Observable<CompetitionEquipe[]>;
  equipesFemininesPlus$: Observable<CompetitionEquipe[]>;
  detailCompetition$: Observable<CompetitionDetail>;

  constructor(private http: HttpClient,
              private modelFactory: ModelFactory<Competition>,
              private _competitionBouchonService: CompetitionBouchonService) {

    this.competition = this.modelFactory.create(initialState);
    this.competition$ = this.competition.data$;

    this.equipesMasculines$ = this.competition$.pipe(map(cmp => cmp.equipesMasculines), distinctUntilChanged());
    this.equipesFeminines$ = this.competition$.pipe(map(cmp => cmp.equipesFeminines), distinctUntilChanged());
    this.equipesMasculinesPlus$ = this.competition$.pipe(map(cmp => cmp.equipesMasculinesPlus), distinctUntilChanged());
    this.equipesFemininesPlus$ = this.competition$.pipe(map(cmp => cmp.equipesFemininesPlus), distinctUntilChanged());
    this.detailCompetition$ = this.competition$.pipe(map(cmp => cmp.detailCompetition), distinctUntilChanged());
  }

  fetchCompetitions() {

    let service: Observable<any> = this.http.get("https://www.gs-tennis.com/api/equipes?codeClub=59400240&millesime=2022");

    if (this.bouchon) {
      service = this._competitionBouchonService.getCompetitions();
    }

    service.subscribe(
      val => {
        const competition = this.competition.get();
        let equipesMasculines = [];
        let equipesMasculinesPlus = [];
        let equipesFeminines = [];
        let equipesFemininesPlus = [];
        val.hommes.map(h => equipesMasculines.push(new CompetitionEquipe(h.id.toString(), 'H', h.nom, h.hLib.split(' - ')[1], h.division, this.getFormeEquipe(h.phases), this.calcVictoiresDefaites(h.phases))));
        val.femmes.map(f => equipesFeminines.push(new CompetitionEquipe(f.id.toString(), 'F', f.nom, f.hLib.split(' - ')[1], f.division, this.getFormeEquipe(f.phases), this.calcVictoiresDefaites(f.phases))));
        val.hommesPlus.map(h => equipesMasculinesPlus.push(new CompetitionEquipe(h.id.toString(), 'H', h.nom, h.hLib.split(' - ')[1], h.division, this.getFormeEquipe(h.phases), this.calcVictoiresDefaites(h.phases))));
        val.femmesPlus.map(f => equipesFemininesPlus.push(new CompetitionEquipe(f.id.toString(), 'F', f.nom, f.hLib.split(' - ')[1], f.division, this.getFormeEquipe(f.phases), this.calcVictoiresDefaites(f.phases))));
        competition.equipesMasculines = equipesMasculines;
        competition.equipesFeminines = equipesFeminines;
        competition.equipesMasculinesPlus = equipesMasculinesPlus;
        competition.equipesFemininesPlus = equipesFemininesPlus;

        this.competition.set(competition);
      }
    )
  }

  fetchDetailCompetition(idEquipe: string): void {

    const competition = this.competition.get();

    let service: Observable<any> = this.http.get(`https://www.gs-tennis.com/api/equipe?idEquipe=${idEquipe}`);

    if (this.bouchon) {
      service = this._competitionBouchonService.getDetailCompetition();
    }


    service.subscribe(
      val => {

        let nIdEquipe = Number(idEquipe);
        let nomEquipe = '';
        let resultats: string[] = []
        let nbVictoires = 0;
        let nbDefaites = 0;
        let nbNuls = 0;
        let tableau = false;

        // calcul des equipes
        let equipes: JourneeEquipe[] = [];

        let phases: CompetitionPhase[] = [];

        val.phases.forEach(ph => {

          tableau = (tableau ||  ph.phase.phase.tableau);

          let phase = new CompetitionPhase(ph.phase.phase.preliminaire, ph.phase.phase.tableau, ph.phase.phase.nom);


          // Calcul des equipes
          ph.detailsEquipes.forEach(e => {
            if (!equipes.find(eq => eq.idEquipe === e.idEquipe) && e.club.nom !== '???') {
              equipes.push(new JourneeEquipe(e.idEquipe, e.club.nom + ' ' + e.numero));

              // Recuperation du nom equipe consultée
              if (e.idEquipe === nIdEquipe) {
                nomEquipe = e.club.nom + ' ' + e.numero;
              }
            }
          });

          // Calcul des journees

          ph.rencontres.forEach(rencontre => {

            let equipe1 = equipes.find(eq => eq.idEquipe === rencontre.equipe1.id);
            let equipe2 = equipes.find(eq => eq.idEquipe === rencontre.equipe2.id);

            if (equipe1 && equipe2) {


              let jRencontre = new JourneeRencontre(equipe1, rencontre.score1, equipe2, rencontre.score2, rencontre.resultat, rencontre.equipeForfait ? true : false, rencontre.dateTheorique, rencontre.dateReelle, rencontre.equipeCenseeRecevoir, rencontre.place);

              let journee = phase.journees.find(journee => journee.numero === rencontre.position);
              if (!journee) {
                journee = new Journee(rencontre.position, [jRencontre]);
                phase.journees.push(journee);
              } else {
                journee.rencontres.push(jRencontre);
              }

              if (jRencontre.equipe1.idEquipe === nIdEquipe) {
                resultats.push(jRencontre.resultat);
                if (jRencontre.resultat === 'V') {
                  nbVictoires++;
                } else if (jRencontre.resultat === 'D') {
                  nbDefaites++;
                } else if (jRencontre.resultat === 'N') {
                  nbNuls++;
                }
              } else if (jRencontre.equipe2.idEquipe === nIdEquipe) {
                if (jRencontre.resultat === 'V') {
                  resultats.push('D');
                  nbDefaites++;
                } else if (jRencontre.resultat === 'D') {
                  resultats.push('V');
                  nbVictoires++;
                } else if (jRencontre.resultat === 'N') {
                  resultats.push('N');
                  nbNuls++;
                }
              }
            }
          });

          // Classement
          if (ph.classements) {
            ph.classements.forEach(c => {
              if (!c.nom.startsWith('???')) {
                phase.classement.push({...c, idEquipe: equipes.find(e => e.nomEquipe === c.nom).idEquipe});
              }
            });
          }

          phases.push(phase);

        });

        // Detail de l'equipe
        let cmpEquipe = new CompetitionEquipe(idEquipe, '', nomEquipe, val.hLib.split(' - ')[1], val.division, resultats.slice(Math.max(resultats.length - 5, 0)), [new Single('Victoires', nbVictoires), new Single('Défaites', nbDefaites), new Single('Nuls', nbNuls)]);

        competition.detailCompetition = new CompetitionDetail(cmpEquipe, phases.reverse(), tableau);

        this.competition.set(competition);
      }
    );
  }

  reset(): void {
    const competition = this.competition.get();

    competition.detailCompetition = new CompetitionDetail();

    this.competition.set(competition);
  }

  /**
   * Retourne les 5 derniers resultats de l'equipe
   * @param phases
   * @returns {string[]}
   */
  getFormeEquipe(phases: any[]): string[] {
    let forme: string[] = [];
    phases.map(phase => phase.rencontres.forEach(rencontre => {
      if (rencontre) {
        forme.push(rencontre);
      }
    }));
    return forme.slice(Math.max(forme.length - 5, 0));
  }

  calcVictoiresDefaites(phases: any[]): Single[] {
    let nbVictoires = 0;
    let nbDefaites = 0;
    phases.map(phase => phase.rencontres.forEach(rencontre => {
      if (rencontre === 'D') {
        nbDefaites++;
      } else if (rencontre === 'V') {
        nbVictoires++;
      }
    }));
    return [new Single('Victoires', nbVictoires), new Single('Défaites', nbDefaites)];
  }

}
