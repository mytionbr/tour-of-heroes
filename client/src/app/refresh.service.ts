import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {

  private refresh = new Subject<any>();

  sendUpdate(value: boolean){
    this.refresh.next(value);
  }

  getUpdate(){
    return this.refresh.asObservable()
  }

  constructor() { }
}
