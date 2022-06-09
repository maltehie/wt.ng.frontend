import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SteamBackendServiceService {

  private REST_ENDPOINT = 'http://localhost:8080/steam/api/';

  constructor(private http: HttpClient) { }

  public getData(url: String): Observable<any>{
    let result = this.http.get(this.REST_ENDPOINT + url);
    return result;
  }

  public postData(url: String, data: any): Observable<any>{
    return this.http.post(this.REST_ENDPOINT + url, data);
  }
}
