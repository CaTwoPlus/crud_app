import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Channel } from '../models/channel.model';
import { Broadcast } from '../models/broadcast.model';
import { Cast } from '../models/cast.model';
import { Show } from '../models/show.model';
import { DataService } from '../data.service';

@Component({
  selector: 'app-latogato',
  templateUrl: './latogato.component.html',
  styleUrls: ['./latogato.component.css']
})
export class LatogatoComponent {
  channels$!: Observable<Channel[]>;
  shows$!: Observable<Show[]>;
  cast$!: Observable<Cast[]>;
  broadcasts$!: Observable<Broadcast[]>;

  constructor(private dataService: DataService) {}

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

}
