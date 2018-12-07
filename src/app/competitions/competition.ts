import { Single } from '../utils/graph';
export class CompetitionEquipe {
  constructor(
    public idEquipe = '',
    public categorie = '',
    public equipe = '',
    public libelle = '',
    public division = '',
    public forme = [],
    public victoiresDefaites: Single[] = []
  ) {}
}

export class JoueurEquipe {
  constructor(
    public id: number,
    public classementSimple: string,
    public classementDouble: string,
    public nom: string,
    public prenom: string,
    public licence: number,
    public age: number
  ) {}
}

export class JourneeEquipe {
  constructor(
    public idEquipe: number,
    public nomEquipe: string
  ) { }
}

export class JourneeRencontre {
  constructor(
    public equipe1: JourneeEquipe,
    public score1: number,
    public equipe2: JourneeEquipe,
    public score2: number,
    public resultat: string,
    public wo: boolean,
    public dateTheorique: string,
    public dateReelle: string,
    public equipeReception: number,
    public place: number = 0
  ) { }
}

export class Journee {
  constructor(
    public numero: number,
    public rencontres: JourneeRencontre[]
  ) {}
}


export class LigneClassement {
  constructor(
    public nom: string,
    public place: number,
    public points: number,
    public nbRencontres: number,
    public matchesAverage: number,
    public setsAverage: number,
    public jeuxAverage: number,
    public pointsDePenalites: number,
    public idEquipe: number
  ) {}
}


export class CompetitionDetail {
  constructor(
    public competitionEquipe: CompetitionEquipe = null,
    public phases: CompetitionPhase[] = null,
    public tableau = false
  ) {}
}

export class CompetitionPhase {
  constructor(
    public preliminaire: boolean,
    public tableau: boolean,
    public libelle: string,
    public journees: Journee[] = [],
    public classement: LigneClassement[] = []
  ) {}
}
