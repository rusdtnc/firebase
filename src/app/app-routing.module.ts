import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './auth-gard.service';

const routes: Routes = [
  { path: 'login',
    loadChildren: 'app/login/login.module#AuthentificationModule',
  },
  { path: '',
    loadChildren: 'app/menu/menu.module#MenuModule',
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
