import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  data: any;
  constructor() { }
  getStorage(key) {
    this.data = localStorage.getItem(key);
    return JSON.parse(this.data);
  }
  setStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
