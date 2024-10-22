import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LatogatoComponent } from './latogato/latogato.component';
import { AdminComponent } from './admin/admin.component';
import { MusorComponent } from './musor/musor.component';

const routes: Routes = [
  { path: '', redirectTo: '/musorujsag', pathMatch: 'full' }, 
  { path: 'musorujsag', component: LatogatoComponent },  
  { path: 'admin', component: AdminComponent },
  { path: 'musor', component: MusorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
