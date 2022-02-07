import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

@Pipe({
  name: 'wordSeo',
})
export class WordSeoPipe implements PipeTransform {
  transform(sentence: string, wordToAdd: string) {
    const word = sentence.toLowerCase();
    if (word.includes(wordToAdd.toLowerCase())) {
      return sentence;
    }
    return wordToAdd.toUpperCase() + ' ' + sentence;

  }
}

