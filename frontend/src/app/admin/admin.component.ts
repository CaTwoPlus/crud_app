import { Component, ViewChild, ElementRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DataService } from '../data.service';
import { MediaService } from '../media.service';
import { Channel } from '../models/channel.model';
import { Broadcast } from '../models/broadcast.model';
import { Show } from '../models/show.model';
import { Cast } from '../models/cast.model';
import { Model } from '../models/model.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  @ViewChild('addEditModalCloseBtn') addEditModalCloseBtn?: ElementRef
  @ViewChild('deleteModalCloseBtn') deleteModalCloseBtn?: ElementRef

  channels$!: Observable<Channel[]>;
  shows$!: Observable<Show[]>;
  broadcastShows$: Observable<Show[]> = of([]);
  cast$!: Observable<Cast[]>;
  episodes$!: Observable<String[]>;
  broadcastEpisodes$: Observable<Show[]> = of([]);
  broadcasts$!: Observable<Broadcast[]>;
  csatorna!: Channel;
  musor!: Show;
  szereplok!: Cast;
  kozvetitesek!: Broadcast;
  item: any;
  modalTitle = '';
  modalText = '';
  kategoriak = ['Játék','Dráma','Ismeretterjesztő','Szórakoztató','Háztartási'];
  channelMediaInput = [''];
  showMediaInput = [''];
  isChannel = false;
  isShow = false;
  isCast = false;
  isBroadcast = false;
  isEdit = false;

  constructor(private dataService: DataService, private mediaService: MediaService) {}

  ngOnInit() {
    this.channels$ = this.dataService.getChannels();
    this.shows$ = this.dataService.getShows();
    this.cast$ = this.dataService.getCast();
    this.broadcasts$ = this.dataService.getBroadcasts();
  }

  scrollTo(section: string) {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  uploadShowMedia(show: string, media: string[]) {
    if (show) {
      this.mediaService.setShowMedia(show, media);
    }
  }

  uploadChannelMedia(channel: string, media: string[]) {
    if (channel) {
      this.mediaService.setChannelMedia(channel, media);
    }
  }

  selectChannel(channel: string) {
    if (channel) {
      this.broadcastShows$ = this.dataService.getShowsByChannel(channel); 
      this.broadcastEpisodes$ = of([]); // Epizódok visszaállítása
    } else {
      this.broadcastShows$ = of([]); // Műsorok és epizódok visszaállítása
      this.broadcastEpisodes$ = of([]);
    }
  }

  selectShow(show: string) {
    if (show) {
      this.broadcastEpisodes$ = this.dataService.getEpisodesByShow(show); 
    } else {
      this.broadcastEpisodes$ = of([]);
    }
  }

  setFormTypeAndFill(item: any) {
    if (item instanceof Channel || item === 'csatorna') {
      !(item instanceof String) ? this.csatorna = new Channel(item.csatorna_nev, item.kategoria, item.leiras) : 
        this.csatorna = new Channel('', '', '');
      this.modalTitle = 'Új csatorna hozzáadása'
      this.isChannel = true;
    }
    if (item instanceof Show || item === 'musor') {
      !(item instanceof String) ? this.musor = new Show(item.musor_cim, item.ismerteto, item.epizod) :
        this.musor = new Show('', '', '');
      this.modalTitle = 'Új műsor hozzáadása'
      this.isShow = true;
    }
    if (item instanceof Cast || item === 'szereplo') {
      !(item instanceof String) ? this.szereplok = new Cast(item.szereplo_nev, item.szul_datum, item.nemzetiseg, item.foglalkozas, item.id) :
        this.szereplok = new Cast('', '', '', '');
      this.modalTitle = 'Új szereplő hozzáadása'
      this.isCast = true;
    }
    if (item instanceof Broadcast || item === 'kozvetites') {
      !(item instanceof String) ? this.kozvetitesek = new Broadcast(item.csatorna_nev, item.musor_cim, item.epizod, item.idopont) :
        this.kozvetitesek = new Broadcast('', '', '', '');
      this.modalTitle = 'Új közvetítés hozzáadása'
      this.isBroadcast = true;
    }
    if (this.isEdit) {
      this.item = '';
    }
  }

  modalEdit(item: any) {
    this.modalTitle = "Szerkesztés";
    this.item = item;
    this.isEdit = true;

    this.setFormTypeAndFill(item);
  }

  modalAdd(model: string){ 
    this.isEdit = false;

    this.setFormTypeAndFill(model);
  }

  modalDelete(item: any){
    this.item = item;

    if (this.item instanceof Broadcast) {
      this.modalTitle = 'Közvetítés törlése'
      this.modalText = 'Biztos, hogy törlöd a következő közvetítést?\n\n' + this.item.toString();
    }
    if (this.item instanceof Cast) {
      this.modalTitle = 'Szereplő törlése'
      this.modalText = 'Biztos, hogy törlöd a következő szereplőt?\n\n' + this.item.toString();
    }
    if (this.item instanceof Channel) {
      this.modalTitle = 'Csatorna törlése'
      this.modalText = 'Biztos, hogy törlöd a következő csatornát?\n\n' + this.item.toString();
    }
    if (this.item instanceof Show) {
      this.modalTitle = 'Műsor törlése'
      this.modalText = 'Biztos, hogy törlöd a következő műsort?\n\n' + this.item.toString();
    }
  }

  modalClose() {
    this.item = null;

    if (this.isBroadcast) {
      this.isBroadcast = false;
    }
    if (this.isCast) {
      this.isCast = false;
    }
    if (this.isChannel) {
      this.isChannel = false;
    }
    if (this.isShow) {
      this.isShow = false;
    }
    if (this.addEditModalCloseBtn?.nativeElement) {
      this.addEditModalCloseBtn.nativeElement.click();
    }
    if (this.deleteModalCloseBtn?.nativeElement) {
      this.deleteModalCloseBtn.nativeElement.click();
    }
  }

  updateItem() {
    if (this.isBroadcast) {
      const formattedDate = new Date(this.kozvetitesek.idopont).toISOString().split('T')[0]; 
      this.kozvetitesek.idopont = formattedDate; 
      this.dataService.updateTable(this.kozvetitesek).subscribe({
        next: (updatedData) => {
          this.broadcasts$ = this.dataService.getBroadcasts();
        },
        error: (error) => {
          console.error('Error updating broadcast:', error);
        }
      });
    }
    if (this.isCast) {
      const formattedDate = new Date(this.szereplok.szul_datum).toISOString().split('T')[0]; 
      this.szereplok.szul_datum = formattedDate; 

      this.dataService.updateTable(this.szereplok).subscribe({
        next: (updatedData) => {
          this.cast$ = this.dataService.getCast();
        },
        error: (error) => {
          console.error('Error updating cast:', error);
        }
      });
    }
    if (this.isChannel) {
      this.dataService.updateTable(this.csatorna).subscribe({
        next: (updatedData) => {
          this.channels$ = this.dataService.getChannels(); 
        },
        error: (error) => {
          console.error('Error updating channel:', error);
        }
      });
    }
    if (this.isShow) {
      this.dataService.updateTable(this.musor).subscribe({
        next: (updatedData) => {
          this.shows$ = this.dataService.getShows();
        },
        error: (error) => {
          console.error('Error updating show:', error);
        }
      });
    }

    this.modalClose();
  }

  createItem() {
    if (this.isBroadcast) {
      const formattedDate = new Date(this.kozvetitesek.idopont).toISOString().split('T')[0]; 
      this.kozvetitesek.idopont = formattedDate; 
      this.dataService.createItem(this.kozvetitesek).subscribe({
        next: (updatedData) => {
          this.broadcasts$ = this.dataService.getBroadcasts();
        },
        error: (error) => {
          console.error('Error creating new record in broadcast:', error);
        }
      });
    }
    if (this.isCast) {
      const formattedDate = new Date(this.szereplok.szul_datum).toISOString().split('T')[0]; 
      this.szereplok.szul_datum = formattedDate; 

      this.dataService.createItem(this.szereplok).subscribe({
        next: (updatedData) => {
          this.cast$ = this.dataService.getCast();
        },
        error: (error) => {
          console.error('Error creating new record in cast:', error);
        }
      });
    }
    if (this.isChannel) {
      this.dataService.createItem(this.csatorna).subscribe({
        next: (updatedData) => {
          this.channels$ = this.dataService.getChannels(); 
        },
        error: (error) => {
          console.error('Error creating new record in channel:', error);
        }
      });
    }
    if (this.isShow) {
      this.dataService.createItem(this.musor).subscribe({
        next: (updatedData) => {
          this.shows$ = this.dataService.getShows();
        },
        error: (error) => {
          console.error('Error creating new record in show:', error);
        }
      });
    }

    this.modalClose();
  }

  deleteItem() {
    if (this.item instanceof Broadcast) {
      this.dataService.deleteItem(this.item).subscribe({
        next: (updatedData) => {
          this.broadcasts$ = this.dataService.getBroadcasts();
        },
        error: (error) => {
          console.error('Error deleting from broadcast:', error);
        }
      });
    }
    if (this.item instanceof Cast) {
      this.dataService.deleteItem(this.item).subscribe({
        next: (updatedData) => {
          this.cast$ = this.dataService.getCast();
        },
        error: (error) => {
          console.error('Error deleting from cast:', error);
        }
      });
    }
    if (this.item instanceof Channel) {
      this.dataService.deleteItem(this.item).subscribe({
        next: (updatedData) => {
          this.channels$ = this.dataService.getChannels(); 
        },
        error: (error) => {
          console.error('Error deleting from channel:', error);
        }
      });
    }
    if (this.item instanceof Show) {
      this.dataService.deleteItem(this.item).subscribe({
        next: (updatedData) => {
          this.shows$ = this.dataService.getShows();
        },
        error: (error) => {
          console.error('Error deleting from show:', error);
        }
      });
    }

    this.modalClose();
  }
}
