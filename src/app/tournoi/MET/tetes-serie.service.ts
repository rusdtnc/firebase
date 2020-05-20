import { Injectable } from '@angular/core';
import { Joueur } from './tournoi';

@Injectable({
  providedIn: 'root'
})
export class TetesSerieService {

  constructor() {
  }

  //RG nb tête de série (p.11 B.2)
  isNbTeteSerieValide(nbTeteSerie: number, effectifTableau: number, nbQualifies: number) {
    return ((effectifTableau / 8) <= nbTeteSerie) && (nbTeteSerie <= (effectifTableau / 2)) && (nbTeteSerie >= nbQualifies);
  }

  //RG place tetes de series
  getConstante(numTeteSerieH: number, numTeteSerieB: number): number {
    return numTeteSerieH + numTeteSerieH;
  }

  // Conseil (p.12 B.4
  getNbTeteSerie(nbQualifie: number): number {
    return nbQualifie;
  }

  //RG Designation des tetes des serie
  getTetesSeries(nbTetesSerie: number, joueurs: Joueur[]): Joueur[] {
    return this.shuffle(joueurs).sort((j1,j2) => j1.classement.echelon - j2.classement.echelon).slice(Math.max(joueurs.length - nbTetesSerie, 0)).reverse();
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }


}
