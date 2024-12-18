import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, throwError } from 'rxjs';
import { Channel } from './models/channel.model';
import { Show } from './models/show.model';
import { Cast } from './models/cast.model';
import { Broadcast } from './models/broadcast.model';
import { Model } from './models/model.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Kapcsolat back-enddel 
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Elem olvasása
  getChannels(): Observable<Channel[]> {
    return this.http.get<Channel[]>(`${this.apiUrl}/csatornak`).pipe(
        map((data: any[]) => data.map(item => new Channel(item.csatorna_nev, item.kategoria, item.leiras)))
    );
  }

  getShows(): Observable<Show[]> {
    return this.http.get<Show[]>(`${this.apiUrl}/musorok`).pipe(
      map((data: any[]) => data.map(item => new Show(item.musor_cim, item.ismerteto, item.epizod, item.szereplok, item.szereplok_ids)))
    );
  }

  getCast(): Observable<Cast[]> {
    return this.http.get<Cast[]>(`${this.apiUrl}/szereplok`).pipe(
      map((data: any[]) => data.map(item => new Cast(item.szereplo_nev, item.szul_datum, item.nemzetiseg, item.foglalkozas, item.id)))
    );
  }

  getBroadcasts(): Observable<Broadcast[]> {
    return this.http.get<Broadcast[]>(`${this.apiUrl}/kozvetitesek`).pipe(
      map((data: any[]) => data.map(item => new Broadcast(item.csatorna_nev, item.musor_cim, item.epizod, item.idopont)))
    );
  }

  getUniqueShows(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/unique_musorok`);
  }

  getUniqueEpisodes(musor_cim: string, csatorna_nev: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/unique_episodes/${csatorna_nev}/${musor_cim}`);
  }

  // Statisztikák
  getChannelStars(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/stats/musorok/getChannelStars`);
  }

  getShowCastCount(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/stats/musorok/getShowCastCount`);
  } 

  getShowByTopBroadcastCount(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/stats/musorok/getShowByTopBroadcastCount`);
  }

  // Új elem hozzáadása
  createItem(model: Model): Observable<any> {
    if (model instanceof Channel) {
      return this.http.post<any>(`${this.apiUrl}/csatornak/${model.csatorna_nev}/${model.kategoria}/${model.leiras}`, model);
    } else if (model instanceof Cast) {
      const params = [
        model.szereplo_nev,
        model.szul_datum,
        model.nemzetiseg,
        model.foglalkozas,
      ].filter((param) => param) .join('/'); // Üres / nem definiált paraméterek kiszűrése
      return this.http.post<any>(`${this.apiUrl}/szereplok/${params}`, model);
    } else if (model instanceof Show) {
      model.musor_cim = encodeURIComponent(model.musor_cim);
      model.ismerteto = encodeURIComponent(model.ismerteto);
      const params = [
        model.musor_cim,
        model.ismerteto,
        model.epizod,
      ].filter((param) => param) .join('/');
      return this.http.post<any>(`${this.apiUrl}/musorok/${params}`, model);
    } else if ( model instanceof Broadcast) {
      return this.http.post<any>(`${this.apiUrl}/kozvetitesek/${model.csatorna_nev}/${model.musor_cim}/${model.epizod}/${model.idopont}`, model);
    }
    return throwError(() => new Error('Unknown model type'));
  }

  // Meglévő elem módosítása
  updateTable(model: Model): Observable<any> {
    if (model instanceof Channel) {
      return this.http.put<any>(`${this.apiUrl}/csatornak/${model.csatorna_nev}/${model.kategoria}/${model.leiras}`, model);
    } else if (model instanceof Cast) {
      const params = [
        model.szereplo_nev,
        model.szul_datum,
        model.nemzetiseg,
        model.foglalkozas,
      ].filter((param) => param) .join('/'); 
      return this.http.put<any>(`${this.apiUrl}/szereplok/${model.id}/${params}`, model);
    } else if (model instanceof Show) {
      model.musor_cim = encodeURIComponent(model.musor_cim);
      model.ismerteto = encodeURIComponent(model.ismerteto);
      const params = [
          model.ismerteto && model.ismerteto !== 'null' ? `ismerteto=${model.ismerteto}` : '',
          model.szereplok_ids && model.szereplok_ids.length > 0 ? `szereplok=${model.szereplok_ids}` : ''
      ].filter(param => param !== '') .join('&'); 
      const url = params ? `${this.apiUrl}/musorok/${model.musor_cim}/${model.epizod}?${params}` : `${this.apiUrl}/musorok/${model.musor_cim}/${model.epizod}`;
      return this.http.put<any>(url, model);
    } else if ( model instanceof Broadcast) {
      return this.http.put<any>(`${this.apiUrl}/kozvetitesek/${model.csatorna_nev}/${model.musor_cim}/${model.epizod}/${model.idopont}`, model);
    }
    return throwError(() => new Error('Unknown model type'));
  }

  // Meglévő elem törlése
  deleteItem(model: Model): Observable<any> {
    if (model instanceof Channel) {
      return this.http.delete<any>(`${this.apiUrl}/csatornak/${model.csatorna_nev}`);
    } else if (model instanceof Cast) {
      return this.http.delete<any>(`${this.apiUrl}/szereplok/${model.id}`);
    } else if (model instanceof Show) {
      return this.http.delete<any>(`${this.apiUrl}/musorok/${model.musor_cim}/${model.epizod}`);
    } else if ( model instanceof Broadcast) {
      return this.http.delete<any>(`${this.apiUrl}/kozvetitesek/${model.csatorna_nev}/${model.musor_cim}/${model.epizod}/${model.idopont}`);
    }
    return throwError(() => new Error('Unknown model type'));
  }
}
