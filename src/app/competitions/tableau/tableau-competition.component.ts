import { Component, Input, OnInit } from '@angular/core';
import { EquipeText, Ligne, Rectangle, Text } from '../../tournoi/tournoi';
import * as moment from 'moment';
import { JourneeRencontre } from '../competition';
import { ActivatedRoute } from '@angular/router';
import { isDefaiteEquipe, isVictoireEquipe } from '../../utils/score';
import { bgPrimary, primary, secondary } from '../../utils/color.utils';
@Component({
  selector: 'app-competition-tableau',
  templateUrl: 'tableau-competition.component.html',
  styleUrls: ['./tableau-competition.component.scss']
})

export class TableauCompetitionComponent implements OnInit {

  rectangles: Rectangle[] = [];
  lignes: Ligne[] = [];
  textes: Text[] = [];
  equipes: EquipeText[] = [];

  @Input() journees;


  nbTours = 1;

  xRectangleOrigine = 20;
  yRectangleOrigine = 20;
  yRectangleOffset = 20;
  wRectangle = 300;
  hRectangle = 40;

  wLigneSortante = 10;
  wLigneEntrante = 30;

  nbEquipes = 0

  viewBox = '0 0 1350 1200';

  idEquipe: number;

  constructor(private _activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.idEquipe = Number(this._activatedRoute.snapshot.paramMap.get('id'));


    this.nbEquipes = Math.pow(2, this.nbTours);

    let xView = this.nbTours * (this.wRectangle + this.wLigneSortante + this.wLigneEntrante) + (this.wRectangle + this.xRectangleOrigine + this.wLigneSortante + this.wLigneEntrante);
    let yView = this.nbEquipes * (this.hRectangle + this.yRectangleOffset) + this.yRectangleOrigine;

    this.viewBox = `0 0 ${xView} ${yView}`;

    this.buildRectangles();
  }

  buildRectangles(): void {


    for (let i = 0; i < this.nbTours; i++) {
      let nbEquipesTour = this.nbEquipes / Math.pow(2, i);

      let journee = this.journees.find(j => j.numero === (i + 1));

      for (let e = 0; e < nbEquipesTour; e++) {

        // Rectangle
        let x = this.xRectangleOrigine + (this.wLigneEntrante + this.wLigneSortante + this.wRectangle) * i;

        let offset = (this.yRectangleOffset + this.hRectangle) * Math.pow(2, i);

        let offsetDepart = (60 * (Math.pow(2, i) - 1)) / 2;

        let y = this.yRectangleOrigine + (offset) * e + offsetDepart;



        let fill = 'white';

        let place = Math.floor(e / 2) + 1

        if (journee) {
          let rencontre: JourneeRencontre = journee.rencontres.find(r => r.place === place);
          if (rencontre) {
            if (e % 2) {
              if (isVictoireEquipe(rencontre,this.idEquipe)) {
                this.textes.push(new Text(x + this.wRectangle - 20, y + 25, rencontre.score2.toString(),15,500, primary));
              } else if (isDefaiteEquipe(rencontre,this.idEquipe)) {
                this.textes.push(new Text(x + this.wRectangle - 20, y + 25, rencontre.score2.toString(),15,500, secondary));
              } else {
                this.textes.push(new Text(x + this.wRectangle - 20, y + 25, rencontre.score2.toString()));
              }

              let nomEquipe = (rencontre.equipeReception === 2)?rencontre.equipe2.nomEquipe+' *': rencontre.equipe2.nomEquipe;

              this.equipes.push(new EquipeText(rencontre.equipe2.idEquipe, x + 10, y + 25, nomEquipe));

              if (this.idEquipe === rencontre.equipe2.idEquipe) {
                fill = bgPrimary;
              }
            } else {
              this.textes.push(new Text(x, y - 5, moment(rencontre.dateReelle).locale('fr').format('DD MMMM YYYY'),10));
              let nomEquipe = (rencontre.equipeReception === 1)?rencontre.equipe1.nomEquipe+' *': rencontre.equipe1.nomEquipe;

              this.equipes.push(new EquipeText(rencontre.equipe1.idEquipe, x + 10, y + 25, nomEquipe));
              if (isVictoireEquipe(rencontre,this.idEquipe)) {
                this.textes.push(new Text(x + this.wRectangle - 20, y + 25, rencontre.score1.toString(),15,500, primary));
              } else if (isDefaiteEquipe(rencontre,this.idEquipe)) {
                this.textes.push(new Text(x + this.wRectangle - 20, y + 25, rencontre.score1.toString(),15,500, secondary));
              } else {
                this.textes.push(new Text(x + this.wRectangle - 20, y + 25, rencontre.score1.toString()));
              }

              if (this.idEquipe === rencontre.equipe1.idEquipe) {
                fill = bgPrimary;
              }
            }
          }
        }

        let rect = new Rectangle(x, y, fill);
        this.rectangles.push(rect);


        let ligneSortante = this.buildLigneSortante(rect.x, rect.y);
        this.lignes.push(ligneSortante);

        if (e % 2) {
          let ligneVerticale = this.buildLigneVerticale(ligneSortante.x2, ligneSortante.y2, offset);
          this.lignes.push(ligneVerticale);
        }

        if (i > 0) {
          let ligneEntrante = this.buildLigneEntrante(rect.x, rect.y);
          this.lignes.push(ligneEntrante);
        }

      }
    }

    let rect = this.buildLastRectangle();
    this.rectangles.push(rect);
  }

  buildLigneSortante(xRectangle: number, yRectangle: number): Ligne {
    let x1 = xRectangle + this.wRectangle;
    let x2 = x1 + this.wLigneSortante;
    let y1 = yRectangle + this.hRectangle / 2;

    return new Ligne(x1, x2, y1, y1);
  }

  buildLigneVerticale(xLigneSortante: number, yLigneSortante: number, offset: number): Ligne {
    let y2 = yLigneSortante - offset;

    return new Ligne(xLigneSortante, xLigneSortante, yLigneSortante, y2);
  }

  buildLigneEntrante(xRectangle: number, yRectangle: number): Ligne {
    let x1 = xRectangle - this.wLigneEntrante;
    let y = yRectangle + this.hRectangle / 2;

    return new Ligne(x1, xRectangle, y, y);
  }

  buildLastRectangle() {
    // Rectangle
    let x = this.xRectangleOrigine + (this.wLigneEntrante + this.wLigneSortante + this.wRectangle) * this.nbTours;
    let offsetDepart = (60 * (Math.pow(2, this.nbTours) - 1)) / 2;

    let y = this.yRectangleOrigine + offsetDepart;


    let ligneEntrante = this.buildLigneEntrante(x, y);
    this.lignes.push(ligneEntrante);

    let journee = this.journees.find(j => j.numero === this.nbTours);

    let rencontre = journee.rencontres[0];

    if(rencontre.resultat === 'V') {
      this.equipes.push(new EquipeText(rencontre.equipe1.idEquipe, x + 10, y + 25, rencontre.equipe1.nomEquipe));
    } else {
      this.equipes.push(new EquipeText(rencontre.equipe2.idEquipe, x + 10, y + 25, rencontre.equipe2.nomEquipe));
    }

    return new Rectangle(x, y);
  }

  detailEquipe(idEquipe: number): void {
    console.log(idEquipe);
  }


}
