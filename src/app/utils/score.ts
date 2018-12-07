import { JourneeRencontre } from '../competitions/competition';


export function isVictoireEquipe(rencontre: JourneeRencontre, idEquipe: number): boolean {
  if(rencontre.equipe1.idEquipe === idEquipe && rencontre.resultat === 'V') {
    return true;
  }

  if(rencontre.equipe2.idEquipe === idEquipe && rencontre.resultat === 'D') {
    return true;
  }

  return false;
}


export function isDefaiteEquipe(rencontre: JourneeRencontre, idEquipe: number): boolean {
  if(rencontre.equipe1.idEquipe === idEquipe && rencontre.resultat === 'D') {
    return true;
  }

  if(rencontre.equipe2.idEquipe === idEquipe && rencontre.resultat === 'V') {
    return true;
  }

  return false;
}
