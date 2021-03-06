import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PresidentialService {

  constructor(private readonly httpClient: HttpClient) { }

  getResult(query: string): Observable<any> {
    return this.httpClient.get(`${environment.api}/api/presidential?slug=${query}`);
  }

  getPlaces(query: string): Observable<any> {
    return this.httpClient.get(`${environment.api}/api/presidential/places?slug=${query}`);
  }

  getRegions(round: string): Observable<any> {
    return this.httpClient.get(`${environment.api}/api/presidential/regions?round=${round}`);
  }

  getDepartements(round: string): Observable<any> {
    return this.httpClient.get(`${environment.api}/api/presidential/departements?round=${round}`);
  }

  getCities(query: string, zone: string): Observable<any> {
    return this.httpClient.get(`${environment.api}/api/presidential/cities?value=${query}&zone=${zone}`);
  }

  getNearestCities(long: string, lat: string): Observable<any> {
    return this.httpClient.get(`${environment.api}/api/presidential/cities?long=${long}&lat=${lat}`);
  }

  getFranceResult(): Observable<any> {
    return this.httpClient.get(`${environment.api}/api/presidential?field=name&value=France`);
  }

  getMostVotedCities(): Observable<any> {
    return this.httpClient.get(`${environment.api}/api/presidential/most-voted`);
  }

  getCandidate(slugCandidate: string, type: string): Observable<any> {
    return this.httpClient.get(`${environment.api}/api/presidential/candidates?type=${type}&candidate=${slugCandidate}`);
  }



}
