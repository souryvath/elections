import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostalCodeService {

  constructor(private readonly httpClient: HttpClient) { }

  getPostalCodes(postalCode: string): Observable<any> {
    return this.httpClient.get(`${environment.api}/api/postal-code?postalCode=${postalCode}`);
  }

  getPostalCodesByInsee(inseeCode: string): Observable<any> {
    return this.httpClient.get(`${environment.api}/api/postal-code?inseeCode=${inseeCode}`);
  }

  getPostalCodeBySlug(slug: string): Observable<any> {
    return this.httpClient.get(`${environment.api}/api/postal-code?slug=${slug}`);
  }

  getNeareastPostalCodes(latitude: number, longitude: number, postalCode: string): Observable<any> {
    return this.httpClient.get(`${environment.api}/api/postal-code/nearest?lat=${latitude}&long=${longitude}&postalCode=${postalCode}`);
  }

  getReverse(latitude: number, longitude: number): Observable<any> {
    return this.httpClient.get(`${environment.api}/api/postal-code/reverse?lat=${latitude}&lon=${longitude}`);
  }
}
