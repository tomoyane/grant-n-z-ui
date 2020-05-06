import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './component/login/login.component';
import {HomeComponent} from './component/users/home/index.component';
import {LoginRequireGuard} from './guard/login-require-guard.service';
import {LoggingInGuard} from './guard/logging-in-guard.service';
import {IndexComponent} from './component/groups/index/index.component';
import {PolicyComponent} from './component/users/policy/policy.component';

const routes: Routes = [
  {path: '', component: LoginComponent, canActivate: [LoggingInGuard]},
  {path: 'users', component: HomeComponent, canActivate: [LoginRequireGuard]},
  {path: 'users/policy', component: PolicyComponent, canActivate: [LoginRequireGuard]},
  {path: 'groups/:id', component: IndexComponent, canActivate: [LoginRequireGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
