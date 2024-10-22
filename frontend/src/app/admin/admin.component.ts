import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  channels$!: Observable<any[]>;
  shows$!: Observable<any[]>;
  cast$!: Observable<any[]>;
  broadcasts$!: Observable<any[]>;
  modalTitle = '';
  nev = '';
  email = '';
  cim = '';
  epizod = '';
  idopont: Date = new Date();
  isChannel = false;
  isShow = false;
  isCast = false;
  isBroadcast = false;

  constructor(private service: DataService) {}

  ngOnInit(): void {
    this.channels$ = this.service.getChannels().pipe(
      map(channels => channels.map(channel => ({ ...channel, type: 'channel' })))
    );
    this.shows$ = this.service.getShows().pipe(
      map(shows => shows.map(show => ({ ...show, type: 'show' })))
    );
    this.cast$ = this.service.getCast().pipe(
      map(cast => cast.map(actor => ({ ...actor, type: 'actor' })))
    );
    this.broadcasts$ = this.service.getBroadcasts().pipe(
      map(broadcasts => broadcasts.map(broadcast => ({ ...broadcast, type: 'broadcast' })))
    );
  }

  scrollTo(section: string): void {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  modalEdit(item: any) {
    this.modalTitle = "Szerkesztés";

    switch (item.type) {
      case 'channel':
          this.isChannel = true;
          break;
      case 'show':
          this.isShow = true;
          break;
      case 'actor':
          this.isCast = true;
          break;
      case 'broadcast':
          this.isBroadcast = true;
          break;
      default:
          console.error('Unknown item type:', item);
          break;  
    }
  }

  modalAdd(){ 
    /*this.alkatresz = {
      id:0,
      nev:null,
      megjegyzes:null,
      kategoriak:null,
      generacio:null,
      ar:0
    }*/
    this.modalTitle = "Hozzáadása";
    //this.activateAddEditAlkatreszComponent = true;
  }

  modalDelete(item:any) {

    this.modalTitle = "Törlés"
  }

  modalClose() {
    //this.activateAddEditAlkatreszComponent = false;
    //this.activateViewAlkatreszComponent = false;
    //this.performSearch();
  }
}
