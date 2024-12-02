import { Component, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';
import { MediaService } from '../media.service';
import { Channel } from '../models/channel.model';
import { Broadcast } from '../models/broadcast.model';
import { Show } from '../models/show.model';
import { Cast } from '../models/cast.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  @ViewChild('addEditModalCloseBtn') addEditModalCloseBtn?: ElementRef
  @ViewChild('deleteModalCloseBtn') deleteModalCloseBtn?: ElementRef
  @ViewChild('statsModalCloseBtn') statsModalCloseBtn?: ElementRef

  channels$!: Observable<Channel[]>;
  shows$!: Observable<Show[]>;
  broadcastShows$!: Observable<Show[]>;
  cast$!: Observable<Cast[]>;
  episodes$!: Observable<String[]>;
  broadcastEpisodes$!: Observable<Show[]>;
  broadcasts$!: Observable<Broadcast[]>;
  castByChannelCount$!: Observable<any[]>;
  showCastCount$!: Observable<any[]>;
  showByTopBroadcastCount$!: Observable<any[]>;
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
  isChannelStars = false;
  isShowCastCount = false;
  isShowByTopBroadcastCount = false;

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

  uploadShowMedia(musor_cim: string, media: string[]) {
    if (musor_cim) {
      this.mediaService.setShowMedia(musor_cim, media);
    }
  }

  uploadChannelMedia(csatorna_nev: string, media: string[]) {
    if (csatorna_nev) {
      this.mediaService.setChannelMedia(csatorna_nev, media);
    }
  }

  selectChannel() {
    this.broadcastShows$ = this.dataService.getUniqueShows(); 
  }

  selectShow(musor_cim: string, csatorna_nev: string) {
    if (musor_cim && csatorna_nev) {
      this.broadcastEpisodes$ = this.dataService.getUniqueEpisodes(musor_cim, csatorna_nev); 
    }
  }

  setFormTypeAndFill(item: any) {
    if (item instanceof Channel || item === 'csatorna') {
      if (typeof item === 'string') {
        this.csatorna = new Channel('', '', '');
        this.modalTitle = 'Új csatorna hozzáadása';
      } else {
        this.csatorna = new Channel(item.csatorna_nev, item.kategoria, item.leiras);
      } 
      this.isChannel = true;
    }
    if (item instanceof Show || item === 'musor') {
      if (typeof item === 'string') {
        this.musor = new Show('', '', '');
        this.modalTitle = 'Új műsor hozzáadása';
      } else {
        this.musor = new Show(item.musor_cim, item.ismerteto, item.epizod, item.szereplok);
      } 
      this.isShow = true;
    }
    if (item instanceof Cast || item === 'szereplo') {
      if (typeof item === 'string') {
        this.szereplok = new Cast('', '', '', '');
        this.modalTitle = 'Új szereplő hozzáadása'
      } else {
        this.szereplok = new Cast(item.szereplo_nev, item.szul_datum, item.nemzetiseg, item.foglalkozas, item.id);
      } 
      this.isCast = true;
    }
    if (item instanceof Broadcast || item === 'kozvetites') {
      if (typeof item === 'string') {
        this.kozvetitesek = new Broadcast('', '', '', '');
        this.modalTitle = 'Új közvetítés hozzáadása'
      } else {
        this.kozvetitesek = new Broadcast(item.csatorna_nev, item.musor_cim, item.epizod, item.idopont);
      } 
      this.isBroadcast = true;
    }
    if (this.isEdit) {
      this.item = '';
    }
  }

  getChannelStars() {
    if (this.isChannelStars) {
      this.castByChannelCount$ = this.dataService.getChannelStars();
    }
  }

  getShowCastCount() {
    this.showCastCount$ = this.dataService.getShowCastCount();
  }

  getShowByTopBroadcastCount() {
    this.showByTopBroadcastCount$ = this.dataService.getShowByTopBroadcastCount();
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
    if (this.statsModalCloseBtn?.nativeElement) {
      this.isChannelStars = false;
      this.isShowByTopBroadcastCount = false;
      this.isShowCastCount = false;
      this.statsModalCloseBtn.nativeElement.click();
    }
  }

  updateItem() {
    if (this.isCast) {
      const formattedDate = new Date(this.szereplok.szul_datum).toISOString().split('T')[0]; 
      this.szereplok.szul_datum = formattedDate; 

      this.dataService.updateTable(this.szereplok).subscribe({
        next: () => {
          this.cast$ = this.dataService.getCast();
        },
        error: (error) => {
          console.error('Error updating cast:', error);
        }
      });
    }
    if (this.isChannel) {
      this.dataService.updateTable(this.csatorna).subscribe({
        next: () => {
          this.channels$ = this.dataService.getChannels(); 
        },
        error: (error) => {
          console.error('Error updating channel:', error);
        }
      });
    }
    if (this.isShow) {
      this.dataService.updateTable(this.musor).subscribe({
        next: () => {
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
      const formattedDate = new Date(this.kozvetitesek.idopont).toLocaleString('hu-HU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).toString().replace(/\s+/g, '');
      this.kozvetitesek.idopont = formattedDate; 
      this.dataService.createItem(this.kozvetitesek).subscribe({
        next: () => {
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
        next: () => {
          this.cast$ = this.dataService.getCast();
        },
        error: (error) => {
          console.error('Error creating new record in cast:', error);
        }
      });
    }
    if (this.isChannel) {
      this.dataService.createItem(this.csatorna).subscribe({
        next: () => {
          this.channels$ = this.dataService.getChannels(); 
        },
        error: (error) => {
          console.error('Error creating new record in channel:', error);
        }
      });
    }
    if (this.isShow) {
      this.dataService.createItem(this.musor).subscribe({
        next: () => {
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
      const formattedDate = new Date(this.item.idopont).toLocaleString('hu-HU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).toString().replace(/\s+/g, '');
      this.item.idopont = formattedDate; 
      this.dataService.deleteItem(this.item).subscribe({
        next: () => {
          this.broadcasts$ = this.dataService.getBroadcasts();
        },
        error: (error) => {
          console.error('Error deleting from broadcast:', error);
        }
      });
    }
    if (this.item instanceof Cast) {
      this.dataService.deleteItem(this.item).subscribe({
        next: () => {
          this.cast$ = this.dataService.getCast();
        },
        error: (error) => {
          console.error('Error deleting from cast:', error);
        }
      });
    }
    if (this.item instanceof Channel) {
      this.dataService.deleteItem(this.item).subscribe({
        next: () => {
          this.channels$ = this.dataService.getChannels(); 
        },
        error: (error) => {
          console.error('Error deleting from channel:', error);
        }
      });
    }
    if (this.item instanceof Show) {
      this.dataService.deleteItem(this.item).subscribe({
        next: () => {
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
