import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setSessionStorageItem(name: string, item: string) {
    sessionStorage.setItem(name, this.encrypt(item))
  }
  getSessionStorageItem(name: string) {
    let data = sessionStorage.getItem(name) || "";
    return this.decrypt(data)
  }

  setLocalStorageItem(name: string, item: string) {
    localStorage.setItem(name, this.encrypt(item))
  }
  getLocalStorageItem(name: string) {
    let data = localStorage.getItem(name) || "";
    return this.decrypt(data)
  }
  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, environment.key).toString();
  }

  private decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, environment.key).toString(CryptoJS.enc.Utf8);
  }

}
