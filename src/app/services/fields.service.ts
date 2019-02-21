import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FieldsService {
  private API = 'https://api.opendota.com/api/';
  private Fields: any = {
    search: 'search',
    matches: 'matches',
    proPlayers: 'proPlayers'
  };
  constructor() { }
  joint(field) {
    return this.API + this.Fields[field];
  }
}
