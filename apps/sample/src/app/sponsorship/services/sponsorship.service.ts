import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SponsorshipService {

  constructor(private readonly httpClient: HttpClient) { }

  getCandidates(query: string): Observable<any> {
    return this.httpClient.get(`${environment.api}/api/sponsorship/candidates?query=${query}`);
  }

  getSponsorships(field: string, value: string): Observable<any> {
    return this.httpClient.get(`${environment.api}/api/sponsorship?field=${field}&value=${value}`);
  }

  getRanking(): Observable<any> {
    return this.httpClient.get(`${environment.api}/api/candidate/ranking`);
  }

  getCandidate(field: string, value: string): Observable<any> {
    return this.httpClient.get(`${environment.api}/api/candidate?field=${field}&value=${value}`);
  }

  getDepartment(field: string, value: string): Observable<any> {
    return this.httpClient.get(`${environment.api}/api/department?field=${field}&value=${value}`);
  }

}
