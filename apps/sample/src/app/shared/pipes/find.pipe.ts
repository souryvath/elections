import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

@Pipe({
  name: 'find',
})
export class FindPipe implements PipeTransform {
  transform(array: any[], value: string) {
    return (array.find((element) => element.round === value));
  }
}
