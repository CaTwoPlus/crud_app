import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DataService } from './data.service';
import { LatogatoComponent } from './latogato/latogato.component';
import { AdminComponent } from './admin/admin.component';
import { MusorComponent } from './musor/musor.component';

@NgModule({
  declarations: [
    LatogatoComponent,
    AdminComponent,
    MusorComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [DataService]
})
export class AppModule { }
