import { Injectable } from '@angular/core';
@Injectable()
export class  TeteSerieService {

  //RG nb tête de série (p.11 B.2)
  isNbTeteSerieValide(nbTeteSerie: number, effectifTableau: number, nbQualifies: number) {
    return (nbTeteSerie <= (effectifTableau / 8)) && (nbTeteSerie <= (effectifTableau / 2)) && (nbTeteSerie >= nbQualifies);
  }

  //RG place tetes de series
  getConstante(numTeteSerieH: number, numTeteSerieB: number): number {
    return numTeteSerieH + numTeteSerieH;
  }

}
