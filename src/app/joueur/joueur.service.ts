import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable, of } from 'rxjs/index';
import { distinctUntilChanged, map } from 'rxjs/internal/operators';
import { JoueurInfos, LignePalmares } from './joueur';
import { Model, ModelFactory } from 'ngx-model';
import { SnackbarService } from '../shared/snackbar/snackbar.service';
import { HttpClient } from '@angular/common/http';
import { JoueurBouchonService } from './joueur.bouchoon.service';
import { Multi, Single } from '../utils/graph';
import * as moment from 'moment';

export interface Joueur {
  value: any,
  key: any
}

const initialState: Joueur = {
  value: new JoueurInfos(),
  key: null
}

@Injectable({
  providedIn: 'root'
})
export class JoueurService {

  private basePath = '/joueurs';

  private joueurConnecte: Model<Joueur>;

  joueurConnecte$: Observable<Joueur>;
  value$: Observable<JoueurInfos>;
  key$: Observable<any>;

  constructor(private db: AngularFireDatabase,
              private modelFactory: ModelFactory<Joueur>,
              private _snackbarService: SnackbarService,
              private httpClient: HttpClient,
              private jourBouchonService : JoueurBouchonService
  ) {
    this.joueurConnecte = this.modelFactory.create(initialState);
    this.joueurConnecte$ = this.joueurConnecte.data$;

    this.value$ = this.joueurConnecte$.pipe(map(step => step.value));
    this.key$ = this.joueurConnecte$.pipe(map(step => step.key), distinctUntilChanged());
  }

  fetchJoueurGoogle(uid) {
    this.db.list(this.basePath, ref => ref.orderByChild('uidGoogle').equalTo(`${uid}`).limitToFirst(1))
      .snapshotChanges()
      .pipe(
        map(
          changes => {
            const joueurConnecte = this.joueurConnecte.get();
            const infos = changes[0].payload.val() as JoueurInfos;
            joueurConnecte.key = changes[0].payload.key;

            localStorage.setItem('application:user',joueurConnecte.key);

            this.jourBouchonService.getInfosJoueur().subscribe(
              val => {
                console.log(val);
                joueurConnecte.value = val;
                joueurConnecte.value.victoiresDefaites = [new Single('Victoires',val.nbVictoires), new Single('Défaites',val.nbDefaites)];
                joueurConnecte.value.stats = val.stats.sort((stat1, stat2) => stat2.echelon - stat1.echelon).map(stat => new Multi(stat.libelle, [new Single('Victoires',stat.victoires), new Single('Défaites',stat.defaites)]))
                joueurConnecte.value.palmares = val.lignes.map(l => new LignePalmares(l.victoire?'V':'D',`${l.nomAdversaire} ${l.prenomAdversaire}`, l.classement, moment(l.date).format('DD/MM/YYYY'), l.libelle, l.score));
                this.joueurConnecte.set(joueurConnecte);
              });
          })).subscribe();
  }

  getJoueurs(): Observable<any[]> {
    return this.db.list(this.basePath).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        })))
    )
  }

  updateJoueur(data) {
    let joueurConnecte = this.joueurConnecte.get();
    joueurConnecte.value = Object.assign(joueurConnecte.value,data);

    let snack = this._snackbarService;

    const obj = this.db.database.ref(`${this.basePath}/${joueurConnecte.key}`);
    return obj.set(joueurConnecte.value, function (error) {
      if (error) {
        snack.addMessageError('Une erreur est survenue');
      } else {
        snack.addMessageSuccess('Modifications du profil enregistrées');
      }
    });
  }
}
