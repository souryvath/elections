import { FRANCE_REGIONS_LIST } from './../sponsorship/regions.constant';
import { CANDIDATES } from '../sponsorship/candidates.constants';
import { CandidateService } from './../sponsorship/candidate.service';
import { SponsorshipService } from './../sponsorship/sponsorship.service';
import { Injectable, Logger } from '@nestjs/common';
import slugify from 'slugify';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { HttpService } from '@nestjs/axios';
import { NextObserver, Observable } from 'rxjs';
import * as csv from 'csvtojson';
import { FRANCE_DEPS } from '../sponsorship/departments.constant';
import { DepartmentService } from '../sponsorship/department.service';
import * as moment from 'moment';
import * as fs from 'fs';
import { PresidentialService } from '../presidential/presidential.service';
import { CANDIDATES_PRESIDENTIAL } from '../presidential/candidates.constants';
const FormData = require('form-data');
const fetch = require('node-fetch');
const converter = require('json-2-csv');

@Injectable()
export class ScraperPresidentialRegionService {

  readonly URL_PRESIDENTIAL_REGION_ROUND_1 = 'https://raw.githubusercontent.com/souryvath/deconfinement_data/master/presidentielles%202017%20csv/2017%20-%201er%20tour%20-%20r%C3%A9gions.csv';
  readonly URL_PRESIDENTIAL_REGION_ROUND_2 = 'https://raw.githubusercontent.com/souryvath/deconfinement_data/master/presidentielles%202017%20csv/2017%20-%202eme%20tour%20-%20r%C3%A9gions.csv';
  readonly URL_SEARCH_ADDRESS = 'http://195.154.90.2:7878/search/csv/';
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly presidentialService: PresidentialService,
    @InjectQueue('scraper') private scraperQueue: Queue
  ) {
    slugify.extend({ '\'': '-' });
    slugify.extend({ '(': '-' });
    slugify.extend({ ')': '-' });
    slugify.extend({ '[': '' });
    slugify.extend({ ']': '' });
  }

  async addPresidentialRegionScrapingQueue(): Promise<boolean> {
    try {
      await this.scraperQueue.add('scrapPresidentialRegion');
      return true;
    } catch (error) {
      this.logger.log(`Scrap PresidentialRegion Failed ${error}`);
      return false;
    }
  }

  async addPresidentialScrapingQueue(): Promise<boolean> {
    try {
      await this.scraperQueue.add('scrapPresidential');
      return true;
    } catch (error) {
      this.logger.log(`Scrap Presidential Failed ${error}`);
      return false;
    }
  }

  scrapPresidentialRegion(round: number): Observable<any> {
    this.logger.log('Scrap PresidentialRegion Function started');
    const urls = [this.URL_PRESIDENTIAL_REGION_ROUND_1, this.URL_PRESIDENTIAL_REGION_ROUND_2];
    return new Observable((observer: NextObserver<any>) => {
      this.httpService.get(urls[round - 1], { responseEncoding: 'latin1'}).subscribe((response) => {
        csv({
          noheader: true,
          output: 'csv',
          delimiter: ';'
        }).fromString(response.data.toString('latin1')).then(async (result) => {

          this.setPresidentialResult(result, (round).toString());
          observer.next(result);
          observer.complete();
          console.log('sponsorship presidential region is done');
        });
      });

    });
  }

  setPresidentialResult(result: any[], round: string) {
    result.shift();
    const presidentialData = [];
    result.forEach((item) => {
      const id = item[0].length === 1 ? `0${item[0]}` : item[0];
      const presidentialResult = {
        code: item[0],
        place: FRANCE_REGIONS_LIST.find((element) => element.id === id),
        name: item[1],
        nbrSubscriptions: item[2],
        nbrAbsents: item[3],
        pctAbsentOnSubscriptions: item[4].replace(/,/g, '.'),
        nbrVotes: item[5],
        pctVotesOnSubscriptions: item[6].replace(/,/g, '.'),
        nbrWhiteVotes: item[7],
        pctWhiteVotesOnSubscriptions: item[8].replace(/,/g, '.'),
        pctWhiteVotesOnVotes: item[9].replace(/,/g, '.'),
        nbrNullVotes: item[10],
        nbrNullVotesOnSubscriptions: item[11].replace(/,/g, '.'),
        nbrNullVotesOnVotes: item[12].replace(/,/g, '.'),
        nbrExprimatedVotes: item[13],
        nbrExprimatedVotesOnSubscriptions: item[14].replace(/,/g, '.'),
        nbrExprimatedVotesOnVotes: item[15].replace(/,/g, '.'),
        candidates: [],
        round
      };
      item.splice(0, 16);
      const finalCandidates = [];
      for (let i = 0; i < item.length; i = i + 6) {
        const candidate = {
          gender: item[i],
          lastName: this.titleCase(item[i + 1]).trim(),
          firstName: this.titleCase(item[i + 2]).trim(),
          nbrVotes: item[i + 3],
          party: 'PARTI POLITIQUE',
          slug: '',
          pctVotesOnSubscriptions: item[i + 4].replace(/,/g, '.'),
          pctVotesOnExprimated: item[i + 5].replace(/,/g, '.'),
          color: ''
        };
        const option = CANDIDATES_PRESIDENTIAL.find((candidateItem) => candidateItem.name === `${candidate.firstName} ${candidate.lastName}`);
        if (option) {
          candidate.party = option.party;
          candidate.color = option.color;
          candidate.slug = option.slug;
        }
        finalCandidates.push(candidate);
      }
      presidentialResult.candidates = finalCandidates;
      presidentialData.push(presidentialResult);
    });
    this.presidentialService.addManyPresidential(presidentialData);
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

}
