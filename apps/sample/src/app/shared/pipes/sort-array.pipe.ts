import { Injectable, Pipe, PipeTransform } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
@Pipe({
  name: 'sortArray',
})
export class SortArrayPipe implements PipeTransform {
  transform(array: any[]) {
    return array.sort();
  }
}
