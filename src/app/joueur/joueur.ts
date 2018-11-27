import { Multi, Single } from '../utils/graph';

export class JoueurInfos {
  constructor(public nom = '',
              public prenom = '',
              public licence = '',
              public victoiresDefaites: Single[] = [],
              public uidGoogle = '',
              public nbDefaites = '',
              public stats: Multi[] = [],
              public palmares: LignePalmares[] = []
              ) {
  }
}

export class LignePalmares {
  constructor(public resultat = '',
              public adversaire = '',
              public classement = '',
              public date = '',
              public competition = '',
              public score = ''
  ) {}
}


