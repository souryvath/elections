import { Injectable, Pipe, PipeTransform } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
@Pipe({
  name: 'numberFix',
})
export class NumberFixPipe implements PipeTransform {
  transform(numberStr: string) {
    return Number(numberStr).toFixed(0);
  }
}
