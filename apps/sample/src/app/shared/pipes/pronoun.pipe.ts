import { Injectable, Pipe, PipeTransform } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
@Pipe({
  name: 'pronoun',
})
export class PronounPipe implements PipeTransform {
  transform(str: string, type: string, tag: string) {
    const types = {
      'city': 'à',
      'region': 'en',
      'departement': 'en',
      'France': 'en',
      'candidate': 'pour',
      'de': 'de'
    };
    if (!types[type]) {
      return `${str}`;
    }
    if (types[type] === 'de') {
      if (/[AEIOUYaeiouy]/i.test(str[0]) && tag === 'strong') {
        return `d'<strong>${str}</strong>`;
      }
      if (/[AEIOUYaeiouy]/i.test(str[0]) && tag !== 'strong') {
        return `d'${str}`;
      }
      if (!/[AEIOUYaeiouy]/i.test(str[0]) && tag !== 'strong') {
        return `de ${str}`;
      }
      return `${types[type]} <strong>${str}</strong>`;
    }
    if (tag === 'strong') {
      return `${types[type]} <strong>${str}</strong>`;
    }
    return `${types[type]} ${str}`;
  }
}
