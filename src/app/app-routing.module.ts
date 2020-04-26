import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './component/login/login.component';
import {HomeComponent} from './component/home/home.component';
import {LoginRequireGuard} from './guard/login-require-guard.service';
import {LoggingInGuard} from './guard/logging-in-guard.service';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [LoginRequireGuard]},
  {path: 'login', component: LoginComponent, canActivate: [LoggingInGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
