import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { JoueurService } from '../joueur/joueur.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = null;

  constructor(private authService: AuthService, private router: Router,
              private zone: NgZone, private _joueurService: JoueurService) {
  }


  signInWithTwitter() {
    this.authService.signInWithTwitter()
      .then((res) => {
      })
      .catch((err) => console.log(err));
  }


  signInWithFacebook() {
    this.authService.signInWithFacebook()
      .then((res) => {
      })
      .catch((err) => console.log(err));
  }


  signInWithGoogle() {
    this.authService.signInWithGoogle()
      .then((res) => {
        this.zone.run(() => {
          if (res.additionalUserInfo.isNewUser) {
            console.log('Nouvel utilisateur');
          } else {
            console.log('Deja venu');
          }


          this.router.navigate(['']);
        });
      })
      .catch((err) => console.log(err));
  }



  ngOnInit() {
  }

}
