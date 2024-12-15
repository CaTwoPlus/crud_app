import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  channelMedia: Map<string, string[]> = new Map<string, string[]>;
  showMedia: Map<string, string[]> = new Map<string, string[]>;

  constructor() { }

  //Return empty array in case of no matches
  getChannelMedia(): Map<string, string[]>;
  getChannelMedia(channel: string): string[]; 
  getChannelMedia(channel?: string): any {
    if (channel) {
      //?? For cases when no value is assosicated with the key
      return this.channelMedia.has(channel) ? this.channelMedia.get(channel) ?? [] : [];
    }
    return this.channelMedia;
  }

  //Return empty array in case of no matches
  getShowMedia(): Map<string, string[]>;
  getShowMedia(show: string): string[]; 
  getShowMedia(show?: string): any {
    if (show) {
      //?? For cases when no value is assosicated with the key
      return this.channelMedia.has(show) ? this.channelMedia.get(show) ?? [] : [];
    }
    return this.showMedia;
  }

  setChannelMedia(channel: string, images: string[]) {
    if (this.channelMedia.has(channel)) {
      this.channelMedia.set(channel, images);
    }
  }

  setShowMedia(show: string, images: string[]) {
    if (this.channelMedia.has(show)) {
      this.channelMedia.set(show, images);
    }
  }
}
