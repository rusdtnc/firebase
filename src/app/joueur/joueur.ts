import { Multi, Single } from '../utils/graph';

export class JoueurInfos {
  constructor(public licencie = new Licencie(),
              public victoiresDefaites: Single[] = [],
              public stats: Multi[] = [],
              public palmares: LignePalmares[] = []) {
  }
}

export class LignePalmares {
  constructor(public resultat = '',
              public adversaire = '',
              public classement = '',
              public date = '',
              public competition = '',
              public score = '') {
  }
}


export class Licencie {
  constructor(public nom = '',
              public prenom = '') {
  }
}
