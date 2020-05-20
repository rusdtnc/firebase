import { TestBed, inject } from '@angular/core/testing';

import { TetesSerieService } from './tetes-serie.service';
import { Classement, Joueur } from './tournoi';

describe('TetesSerieService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TetesSerieService]
    });
  });

  it('should be created', inject([TetesSerieService], (service: TetesSerieService) => {
    expect(service).toBeTruthy();
  }));


  it('verification nombre tete de serie', inject([TetesSerieService], (service: TetesSerieService) => {
    expect(service.isNbTeteSerieValide(2,4,0)).toBeTruthy();
    expect(service.isNbTeteSerieValide(3,4,0)).toBeFalsy();
    expect(service.isNbTeteSerieValide(3,24,3)).toBeTruthy();
    expect(service.isNbTeteSerieValide(6,24,3)).toBeTruthy();
    expect(service.isNbTeteSerieValide(9,24,3)).toBeTruthy();
  }));


  it('verification choix des tetes de series', inject([TetesSerieService], (service: TetesSerieService) => {
    const joueurs = [
      new Joueur('NC1', new Classement('NC',50)),
      new Joueur('NC2', new Classement('NC',50)),
      new Joueur('NC3', new Classement('NC',50)),
      new Joueur('NC4', new Classement('NC',50)),

      new Joueur('351', new Classement('30/5',70)),
      new Joueur('352', new Classement('30/5',70)),
      new Joueur('353', new Classement('30/5',70)),

      new Joueur('341', new Classement('30/4',80)),
      new Joueur('342', new Classement('30/4',80)),

      new Joueur('321', new Classement('30/2',100)),
      new Joueur('322', new Classement('30/2',100)),
      new Joueur('323', new Classement('30/2',100)),

      new Joueur('311', new Classement('30/1',110)),
      new Joueur('312', new Classement('30/1',110)),

      new Joueur('30', new Classement('30',120))
    ];


   // let tetesSeries: Joueur[] = service.getTetesSeries(4,joueurs);

   // console.log(tetesSeries);


    console.log(service.getTetesSeries(4,joueurs));


  }));
});
