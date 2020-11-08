import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LauchManagerService {
  private dataSource = new BehaviorSubject<any>([]);
  private url = 'https://api.spaceXdata.com/v3/launches?limit=100';

  constructor(public http: HttpClient) { }

  fetchLaunchList(payload?) {
    let payloadString = '';
    if (payload) {
      payloadString = payload.launch_year ?
        payloadString + '&launch_year=' + payload.launch_year : payloadString;
      payloadString = 'land_success' in payload && payload.land_success !== undefined ?
        payloadString + '&land_success=' + payload.land_success : payloadString;
      payloadString = 'launch_success' in payload && payload.launch_success !== undefined ?
        payloadString + '&launch_success=' + payload.launch_success : payloadString;

    }
    const endpoint = this.url + payloadString;
    return this.http.get(endpoint)
      .subscribe(data => {
        this.dataSource.next(data);
      });
  }
  getDataList(): Observable<any> {
    return this.dataSource.asObservable();
  }
}
