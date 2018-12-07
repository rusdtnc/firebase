import { Component, OnInit } from '@angular/core';
import { Rectangle, Ligne, Text } from './tournoi';
import { Journee, JourneeEquipe, JourneeRencontre } from '../competitions/competition';

@Component({
  selector: 'app-tournoi',
  templateUrl: './tournoi.component.html',
  styleUrls: ['./tournoi.component.scss']
})
export class TournoiComponent implements OnInit {

  rectangles: Rectangle[] = [];
  lignes: Ligne[] = [];
  textes: Text[] = [];


  nbTours = 2;

  xRectangleOrigine = 20;
  yRectangleOrigine = 20;
  yRectangleOffset = 20;
  wRectangle = 300;
  hRectangle = 40;

  wLigneSortante = 10;
  wLigneEntrante = 30;

  nbEquipes = 0

  viewBox = '0 0 1350 1200';

  rencontre1 = new JourneeRencontre(new JourneeEquipe(1, 'TC GASTES1'), 3, new JourneeEquipe(1, 'TC GASTES2'), 0, 'V', false, '28/10/2018', '28/10/2018', 1, 1);
  rencontre2 = new JourneeRencontre(new JourneeEquipe(1, 'TC GASTES3'), 3, new JourneeEquipe(1, 'TC GASTES4'), 0, 'V', false, '28/10/2018', '28/10/2018', 1, 2);

  rencontre3 = new JourneeRencontre(new JourneeEquipe(1, 'TC GASTES1'), 3, new JourneeEquipe(1, 'TC GASTES3'), 0, 'V', false, '28/10/2018', '28/10/2018', 1, 1);

  journee1 = new Journee(1, [this.rencontre1, this.rencontre2]);
  journee2 = new Journee(2, [this.rencontre3]);

  journees = [this.journee1, this.journee2];


  constructor() {
  }

  ngOnInit() {
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


        let rect = new Rectangle(x, y);
        this.rectangles.push(rect);


        let place = Math.floor(e / 2) + 1

        if (journee) {
          let rencontre = journee.rencontres.find(r => r.place === place);
          if (rencontre) {
            if (e % 2) {
              this.textes.push(new Text(x, y - 10, rencontre.dateTheorique));
              this.textes.push(new Text(x + 10, y + 25, rencontre.equipe2.nomEquipe));
              this.textes.push(new Text(x + this.wRectangle - 20, y + 25, rencontre.score2.toString()));
            } else {
              this.textes.push(new Text(x + 10, y + 25, rencontre.equipe1.nomEquipe));
              this.textes.push(new Text(x + this.wRectangle - 20, y + 25, rencontre.score1.toString()));
            }
          }
        }


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
      this.textes.push(new Text(x + 10, y + 25, rencontre.equipe1.nomEquipe));
    } else {
      this.textes.push(new Text(x + 10, y + 25, rencontre.equipe2.nomEquipe));
    }

    return new Rectangle(x, y);
  }

  test(x, y) {

    this.textes.push(new Text(x + 10, y + 25, 'GASTES TC2'))
  }


}
