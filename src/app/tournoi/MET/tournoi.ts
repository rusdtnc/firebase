export class Classement {
  constructor(public libelle: string,
              public echelon: number) {
  }
}

export class Joueur {
  constructor(public nom: string,
              public classement: Classement) {
  }
}

export class TeteSerie {
  constructor(public numero: number,
              public joueur: Joueur) {

  }
}

export class Tour {

}

export class Section {
   map: Map<string,number>;

   constructor() {
   }

}
