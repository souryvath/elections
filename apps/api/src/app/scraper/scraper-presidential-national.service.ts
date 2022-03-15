import { Injectable, Logger } from '@nestjs/common';
import slugify from 'slugify';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { HttpService } from '@nestjs/axios';
import { NextObserver, Observable } from 'rxjs';
import * as csv from 'csvtojson';
import { PresidentialService } from '../presidential/presidential.service';
import { CANDIDATES_PRESIDENTIAL } from '../presidential/candidates.constants';

@Injectable()
export class ScraperPresidentialNationalService {

  readonly URL_PRESIDENTIAL_NATIONAL_CANDIDATE_ROUND_1 = 'https://github.com/souryvath/deconfinement_data/raw/master/presidentielles%202017%20csv/2017%20-%201er%20tour%20-%20national%20-%20candidat.csv';
  readonly URL_PRESIDENTIAL_NATIONAL_ROUND_1 = 'https://raw.githubusercontent.com/souryvath/deconfinement_data/master/presidentielles%202017%20csv/2017%20-%201er%20tour%20-%20national%20-%20chiffres.csv';
  readonly URL_PRESIDENTIAL_NATIONAL_CANDIDATE_ROUND_2 = 'https://github.com/souryvath/deconfinement_data/raw/master/presidentielles%202017%20csv/2017%20-%202eme%20tour%20-%20national%20-%20candidat.csv';
  readonly URL_PRESIDENTIAL_NATIONAL_ROUND_2 = 'https://github.com/souryvath/deconfinement_data/raw/master/presidentielles%202017%20csv/2017%20-%202eme%20tour%20-%20national%20-%20chiffres.csv';
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly presidentialService: PresidentialService
  ) {
    slugify.extend({ '\'': '-' });
    slugify.extend({ '(': '-' });
    slugify.extend({ ')': '-' });
    slugify.extend({ '[': '' });
    slugify.extend({ ']': '' });
  }

  scrapPresidentialNational(round: number): Observable<any> {
    this.logger.log('ScrapPresidentialNational Function started');
    const urls = [];
    if (round === 1) {
      urls.push(this.httpService.get(this.URL_PRESIDENTIAL_NATIONAL_CANDIDATE_ROUND_1, { responseEncoding: 'latin1' }).toPromise());
      urls.push(this.httpService.get(this.URL_PRESIDENTIAL_NATIONAL_ROUND_1, { responseEncoding: 'latin1' }).toPromise());
    }
    if (round === 2) {
      urls.push(this.httpService.get(this.URL_PRESIDENTIAL_NATIONAL_CANDIDATE_ROUND_2, { responseEncoding: 'latin1' }).toPromise());
      urls.push(this.httpService.get(this.URL_PRESIDENTIAL_NATIONAL_ROUND_2, { responseEncoding: 'latin1' }).toPromise());
    }
    return new Observable((observer: NextObserver<any>) => {
      Promise.all(urls).then((data) => {
        let rounds = [{
          candidate: data[0].data,
          stat: data[1].data
        }];
        rounds.forEach((roundItem, i) => {
          Promise.all([
            csv({
              noheader: true,
              output: 'csv',
              delimiter: ';'
            }).fromString(roundItem.candidate.toString('latin1')),
            csv({
              noheader: true,
              output: 'csv',
              delimiter: ';'
            }).fromString(roundItem.stat.toString('latin1')),
          ]).then((roundTab) => {
            this.setPresidentialResult(roundTab, (round).toString());
          });
        });
        observer.next(rounds);
        observer.complete();
        console.log('sponsorship PresidentialNational is done');

      })
    });
  }

  getCandidates(round1Candidate: any[]) {
    round1Candidate.shift();
    const finalCandidates = [];
    round1Candidate.forEach((item) => {
      const indexOfSpace = item[0].indexOf(' ');
      const candidateStr = item[0].substring(indexOfSpace + 1);
      const match = (/[a-zéèàê]/).exec(candidateStr);
      let lastName = '';
      let firstName = '';
      if (match) {
        firstName = candidateStr.substring(match.index - 1, candidateStr.length).trim();
        lastName = this.titleCase(candidateStr.substring(0, match.index - 1).trim());
      }
      const candidate = {
        gender: '',
        lastName,
        firstName,
        nbrVotes: item[1],
        party: 'PARTI POLITIQUE',
        color: ' ',
        slug: '',
        pctVotesOnSubscriptions: Number(item[2].replace(/,/g, '.')),
        pctVotesOnExprimated: Number(item[3].replace(/,/g, '.'))
      };
      const option = CANDIDATES_PRESIDENTIAL.find((candidateItem) => candidateItem.name === `${candidate.firstName} ${candidate.lastName}`);
      if (option) {
        candidate.party = option.party;
        candidate.color = option.color;
        candidate.slug = option.slug;
      }
      if (item[0] !== '') {
        finalCandidates.push(candidate);
      }
    });
    return (finalCandidates.sort((a, b) => (Number(a.pctVotesOnSubscriptions) > Number(b.pctVotesOnSubscriptions)) ? -1 : 1));
  }

  setPresidentialResult(roundTab: any[], round: string) {
    const round1Candidate = roundTab[0];
    const round1Stat = roundTab[1];
    roundTab[1].shift();
    const presidentialResult = {
      code: 'FR',
      place: {
        'name': 'France'
      },
      name: 'France',
      nbrSubscriptions: Number(round1Stat[0][1]),
      nbrAbsents: Number(round1Stat[1][1]),
      pctAbsentOnSubscriptions: Number(round1Stat[1][2].replace(/,/g, '.')),
      nbrVotes: Number(round1Stat[2][1]),
      pctVotesOnSubscriptions: Number(round1Stat[2][2].replace(/,/g, '.')),
      nbrWhiteVotes: Number(round1Stat[3][1].replace(/,/g, '.')),
      pctWhiteVotesOnSubscriptions: Number(round1Stat[3][2].replace(/,/g, '.')),
      pctWhiteVotesOnVotes: Number(round1Stat[3][3].replace(/,/g, '.')),
      nbrNullVotes: Number(round1Stat[4][1].replace(/,/g, '.')),
      nbrNullVotesOnSubscriptions: Number(round1Stat[4][2].replace(/,/g, '.')),
      nbrNullVotesOnVotes: Number(round1Stat[4][3].replace(/,/g, '.')),
      nbrExprimatedVotes: Number(round1Stat[5][1].replace(/,/g, '.')),
      nbrExprimatedVotesOnSubscriptions: Number(round1Stat[5][2].replace(/,/g, '.')),
      nbrExprimatedVotesOnVotes: Number(round1Stat[5][3].replace(/,/g, '.')),
      candidates: this.getCandidates(round1Candidate),
      round
    };
    this.presidentialService.addPresidential(presidentialResult);
  }

  private titleCase(string) {
    var separateWord = string.toLowerCase().split(' ');
    for (var i = 0; i < separateWord.length; i++) {
      separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
        separateWord[i].substring(1);
    }
    let str = '';
    const index = separateWord.join(' ').indexOf('-');
    if (index !== -1) {
      str = separateWord.join(' ').substring(0, index + 1) + separateWord.join(' ').substring(index, separateWord.join(' ').length).charAt(1).toUpperCase() + separateWord.join(' ').substring(index + 2, separateWord.join(' ').length);
      return str;
    }
    return separateWord.join(' ');
  }

}
