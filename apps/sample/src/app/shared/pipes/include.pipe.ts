import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

@Pipe({
  name: 'include',
})
export class IncludePipe implements PipeTransform {
  transform(str: string, value: string) {
    return (str.includes(value));
  }
}
