import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private config$ = new BehaviorSubject<any>({header:true,footer:true,sidebar:true});
  constructor() { }

  getConfig()
  {
     return this.config$.asObservable();
  }


  setConfig(config:any)
  {
    this.config$.next(config)
  }
  resetConfig()
  {
    this.config$.next({header:true,footer:true,sidebar:true})
  }
}
