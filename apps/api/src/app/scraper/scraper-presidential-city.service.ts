import { CANDIDATES_PRESIDENTIAL } from './../presidential/candidates.constants';
import { PostalCodeService } from './../postal-code/postal-code.service';
import { Injectable, Logger } from '@nestjs/common';
import slugify from 'slugify';
import { HttpService } from '@nestjs/axios';
import { NextObserver, Observable } from 'rxjs';
import * as csv from 'csvtojson';
import { PresidentialService } from '../presidential/presidential.service';
import { FRANCE_DEPS } from '../sponsorship/departments.constant';
import { DOM_TOM_CODE_DEPARTEMENT, DOM_TOM_INSEE } from './tab_dom_tom';
import { MAYOTTE } from './tab_mayotte';

@Injectable()
export class ScraperPresidentialCityService {

  // readonly URL_PRESIDENTIAL_CITY_ROUND_1 = 'https://raw.githubusercontent.com/souryvath/deconfinement_data/master/presidentielles%202017%20csv/2017%20-%202eme%20tour%20-%20communes-test-monthurel.csv';
  readonly URL_PRESIDENTIAL_CITY_ROUND_1 = 'https://raw.githubusercontent.com/souryvath/deconfinement_data/master/presidentielles%202017%20csv/2017%20-%201er%20tour%20-%20communes.csv';
  readonly URL_PRESIDENTIAL_CITY_ROUND_2 = 'https://raw.githubusercontent.com/souryvath/deconfinement_data/master/presidentielles%202017%20csv/2017%20-%202eme%20tour%20-%20communes.csv';
  // readonly URL_PRESIDENTIAL_CITY_ROUND_2 = 'https://raw.githubusercontent.com/souryvath/deconfinement_data/master/presidentielles%202017%20csv/2017%20-%202eme%20tour%20-%20communes-test-monthurel.csv';
  readonly URL_SEARCH_ADDRESS = 'http://195.154.90.2:7878/search/csv/';
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly presidentialService: PresidentialService,
    private readonly postalCodeService: PostalCodeService
  ) {
    slugify.extend({ '\'': '-' });
    slugify.extend({ '(': '-' });
    slugify.extend({ ')': '-' });
    slugify.extend({ '[': '' });
    slugify.extend({ ']': '' });
  }

  scrapPresidentialCity(round: number): Observable<any> {
    this.logger.log('Scrap PresidentialCity Function started');
    const urls = [this.URL_PRESIDENTIAL_CITY_ROUND_1, this.URL_PRESIDENTIAL_CITY_ROUND_2];
    return new Observable((observer: NextObserver<any>) => {
      this.httpService.get(urls[round - 1], { responseEncoding: 'latin1'}).subscribe((response) => {
        csv({
          noheader: true,
          output: 'csv',
          delimiter: ';'
        }).fromString(response.data.toString('latin1')).then(async (result) => {
          const res = await this.setPresidentialResult(result, (round).toString());
          observer.next(result);
          observer.complete();
          console.log('sponsorship PresidentialCity is done');
        });
      });

    });
  }

  async setPresidentialResult(result: any[], round: string) {
    result.shift();
    for await (const item of result) {
      let codeDepartement = item[0].length === 1 ? `0${item[0]}` : item[0];
      if (DOM_TOM_INSEE[codeDepartement]) {
        codeDepartement = DOM_TOM_INSEE[codeDepartement];
      }
      const codeInsee = `${codeDepartement}${this.setCodeCity(item[0], codeDepartement, item[2])}`;
      let postalCode: any = await this.postalCodeService.findPostalCodesByInseeCode(codeInsee);
      if (postalCode) {
        postalCode.name = item[3];
      }
      if (!postalCode) {
        postalCode = {
          postalCode: '',
          slug: slugify(item[3], { lower: true, remove: /[*+~.()'"!:@/]/g }),
          name: item[3],
          location: {}
        };
      }
      const presidentialResult = {
        code: codeInsee,
        place: postalCode,
        name: item[3],
        nbrSubscriptions: item[4],
        nbrAbsents: item[5],
        pctAbsentOnSubscriptions: item[6].replace(/,/g, '.'),
        nbrVotes: item[7],
        pctVotesOnSubscriptions: item[8].replace(/,/g, '.'),
        nbrWhiteVotes: item[9],
        pctWhiteVotesOnSubscriptions: item[10].replace(/,/g, '.'),
        pctWhiteVotesOnVotes: item[11].replace(/,/g, '.'),
        nbrNullVotes: item[12],
        nbrNullVotesOnSubscriptions: item[13].replace(/,/g, '.'),
        nbrNullVotesOnVotes: item[14].replace(/,/g, '.'),
        nbrExprimatedVotes: item[15],
        nbrExprimatedVotesOnSubscriptions: item[16].replace(/,/g, '.'),
        nbrExprimatedVotesOnVotes: item[17].replace(/,/g, '.'),
        candidates: [],
        location: postalCode.location,
        round
      };
      if (presidentialResult.place) {
        let codeDep = item[0].length === 1 ? `0${item[0]}` : item[0];
        if (DOM_TOM_CODE_DEPARTEMENT[codeDep]) {
          codeDep = DOM_TOM_CODE_DEPARTEMENT[codeDep];
        }
        const departement = FRANCE_DEPS.find((item) => item.code.substring(3) === codeDep);
        presidentialResult.place.departement = {
          ...departement
        }
      }
      item.splice(0, 19);
      const finalCandidates = [];
      for (let i = 0; i < item.length; i = i + 7) {
        const candidate = {
          gender: item[i],
          lastName: this.titleCase(item[i + 1]).trim(),
          firstName: this.titleCase(item[i + 2]).trim(),
          nbrVotes: item[i + 3],
          party: 'PARTI POLITIQUE',
          pctVotesOnSubscriptions: item[i + 4].replace(/,/g, '.'),
          pctVotesOnExprimated: item[i + 5].replace(/,/g, '.'),
          color: ''
        };
        const option = CANDIDATES_PRESIDENTIAL.find((candidateItem) => candidateItem.name === `${candidate.firstName} ${candidate.lastName}`);
        if (option) {
          candidate.party = option.party;
          candidate.color = option.color;
        }
        finalCandidates.push(candidate);
      }
      presidentialResult.candidates = finalCandidates;
      this.presidentialService.addPresidential(presidentialResult);
    }
    return ([]);
  }

  private titleCase(string){
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

  setCodeCity(codeCsv: string, codeDepartement: string, codeCity: string) {
    let code = codeCity;
    if (codeCsv === 'ZM' && MAYOTTE[codeCity]) {
      code = MAYOTTE[codeCity];
    }

    if (codeDepartement.length === 2) {
      if (code.length === 1) {
        return (`00${code}`);
      }
      else if (code.length === 2) {
        return (`0${code}`);
      }
      else if (code.length === 3) {
        return (`${code}`);
      }
    }
    else if (codeDepartement.length === 3) {
      if (code.length === 1) {
        return (`0${code}`);
      }
      else if (code.length === 2) {
        return (`${code}`);
      }
    }
    else if (codeDepartement.length === 4) {
      if (code.length === 1) {
        return (`${code}`);
      }
    }
  }
}
