import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LatogatoComponent } from './latogato/latogato.component';
import { AdminComponent } from './admin/admin.component';
import { MusorComponent } from './musor/musor.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './admin/authGuard.component';
import { LoginGuard } from './login/loginGuard.component';

const routes: Routes = [
  { path: '', redirectTo: 'musorujsag', pathMatch: 'full' }, 
  { path: 'musorujsag', component: LatogatoComponent },  
  { path: 'admin', component: AdminComponent, canActivate:[AuthGuard] },
  { path: 'musor', component: MusorComponent},
  { path: 'login', component: LoginComponent, canActivate:[LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }