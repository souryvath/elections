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
const FormData = require('form-data');
const fetch = require('node-fetch');
const converter = require('json-2-csv');

@Injectable()
export class ScraperSponsorshipService {

  readonly URL_SPONSORSHIP = 'https://presidentielle2022.conseil-constitutionnel.fr/telechargement/parrainagestotal.csv';
  readonly URL_SEARCH_ADDRESS = 'http://195.154.90.2:7878/search/csv/';
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly sponsorshipService: SponsorshipService,
    private readonly departmentService: DepartmentService,
    private readonly candidateService: CandidateService,
    @InjectQueue('scraper') private scraperQueue: Queue
  ) {
    slugify.extend({ '\'': '-' });
    slugify.extend({ '(': '-' });
    slugify.extend({ ')': '-' });
    slugify.extend({ '[': '' });
    slugify.extend({ ']': '' });
  }

  async addSponsorshipScrapingQueue(): Promise<boolean> {
    try {
      await this.scraperQueue.add('scrapSponsorship');
      return true;
    } catch (error) {
      this.logger.log(`Scrap Sponsorship Failed ${error}`);
      return false;
    }
  }

  scrapSponsorship(): Observable<any> {
    this.logger.log('Scrap Sponsorship Function started');
    return new Observable((observer: NextObserver<any>) => {
      this.httpService.get(this.URL_SPONSORSHIP).subscribe((response) => {
        csv({
          noheader: true,
          output: 'csv',
          delimiter: ';'
        }).fromString(response.data).then(async (result) => {
          result.shift();
          const sponsorships = this.getSponsorships(result);
          const resCsv = await converter.json2csvAsync(sponsorships);
          console.log('START');
          fs.writeFile('sponsorships.csv', resCsv, async (err) => {
            const sponsorshipsFromGouv = await this.fetchAdressFromGouv();
            this.resetDatabase();
            const sponsos = this.setSponsorships(sponsorshipsFromGouv);
            this.setCandidates(sponsos);
            this.setDepartments(sponsos);
            console.log('FINISH');
          });

          // const departments = [...new Set(sponsorships.map(item => item.department))];
          // const departments2 = [...new Set(FRANCE_DEPS.map(item => item.name))];
          // console.log(departments.filter(x => !departments2.includes(x)));
          observer.next(result);
          observer.complete();
          console.log('sponsorship scraping is done');
        });
      });
    });
  }

  getSponsorships(result: any): any[] {
    const sponsorships = [];
    result.forEach((element) => {
      const match = (/[a-zéèàê]/).exec(element[6]);
      let candidate = '';
      if (match) {
        candidate = element[6].substring(match.index - 1, element[6].length).trim() + ' ' + this.titleCase(element[6].substring(0, match.index - 1).trim())
      }
      const dep = FRANCE_DEPS.find((item) => item.name === element[5]);
      if (!dep) {
        console.log(element[5]);
      }
      const sponsorship = {
        civility: element[0],
        lastName: this.titleCase(element[1]).trim(),
        firstName: element[2],
        mandate: element[3],
        district: element[4],
        department: element[5],
        departmentCode: dep?.code,
        departmentSlug: dep?.slug,
        candidate: candidate.trim(),
        slugCandidate: slugify(candidate.trim(), { lower: true, remove: /[*+~.()'"!:@/]/g }),
        date: element[7],
        region: dep?.region?.name,
      }
      sponsorships.push(sponsorship);
    });
    return (sponsorships);
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

  setSponsorships(data) {
    let sponsorships = [];
    data.forEach((element) => {
      let location = null;
      if (element[23].substring(0, element[23].indexOf(',')) === element[6].slice(3) && element[3] === 'Maire') {
        location = {
          type: 'Point',
          coordinates: [Number(element[13]), Number(element[12])]
        }
      }
      const sponsorship = {
        lastName: element[1],
        firstName: element[2],
        mandate: element[3],
        district: element[4],
        department: element[5],
        departmentCode: element[6],
        departmentSlug: element[7],
        candidate: element[8],
        slugCandidate: element[9],
        date: element[10],
        location
      };
      sponsorships.push(sponsorship);
    })
    this.sponsorshipService.addManySponsorship(sponsorships);
    return sponsorships;
  }

  setCandidates(sponsorships: any[]): void {
    const candidates = [...new Set(sponsorships.map(item => item.candidate))];
    candidates.forEach((candidateItem) => {
      let departments = [];
      FRANCE_DEPS.forEach((element) => {
        const newValue = {
          name: element.name,
          code: element.code,
          value: sponsorships.filter((sponsorItem) => sponsorItem.departmentCode === element.code && sponsorItem.candidate === candidateItem).length,
          percent: null
        }
        newValue.percent = Number(newValue.value) / Number(sponsorships.filter((sponsorItem) => sponsorItem.candidate === candidateItem).length) * 100
        departments.push(newValue);
      });
      const uniqDates = [...new Set(sponsorships.filter((sponsorItem) => sponsorItem.candidate === candidateItem).map(item => item.date))];
      const timeline = [];
      uniqDates.forEach((dateItem) => {
        const dates = sponsorships.filter((sponsorItem) => sponsorItem.date === dateItem && sponsorItem.candidate === candidateItem);
        timeline.push({
          date: moment(dateItem, "DD/MM/YYYY").toDate().getTime(),
          value: dates.length
        });
      });
      const cand = CANDIDATES.find((candidateParty) => candidateParty.name === candidateItem);
      const candidate = {
        name: candidateItem,
        slug: slugify(candidateItem, { lower: true, remove: /[*+~.()'"!:@/]/g }),
        party: cand ? cand.party : '-',
        numberSponsorships: sponsorships.filter((item) => item.candidate === candidateItem).length,
        numberDepartments: departments.filter((depItem) => depItem.value > 0).length,
        sponsorships: sponsorships.filter((item) => item.candidate === candidateItem),
        hasTenPercent: departments.filter((depItem) => depItem.percent > 10).length > 0 ? true: false,
        departments,
        timeline
      };
      this.candidateService.addCandidate(candidate);
    });
  }

  setDepartments(sponsorships: any[]): void {
    FRANCE_DEPS.forEach((element) => {
      const sponsorshipsDep = sponsorships.filter((item) => item.departmentCode === element.code);
      const candidates = [...new Set(sponsorshipsDep.map(item => item.candidate))];
      let rankings = [];
      candidates.forEach((candidateItem) => {
        const sponsorshipsCandidates = sponsorshipsDep.filter((item) => item.candidate === candidateItem);
        const cand = CANDIDATES.find((candidateParty) => candidateParty.name === candidateItem);
        const ranking = {
          name: candidateItem,
          party: cand ? cand.party : '-',
          numberSponsorships: sponsorshipsCandidates.length,
          slug: slugify(candidateItem, { lower: true, remove: /[*+~.()'"!:@/]/g })
        }
        rankings.push(ranking);
      })
      const department = {
        name: element.name,
        slug: element.slug,
        code: element.code,
        sponsorships: sponsorshipsDep,
        numberSponsorships: sponsorshipsDep.length,
        candidates: rankings.sort((a, b) => (a.numberSponsorships < b.numberSponsorships) ? 1 : -1)
      }
      this.departmentService.addDepartment(department);
    })

  }

  resetDatabase() {
    this.sponsorshipService.deleteAllSponsorship();
    this.sponsorshipService.createIndexGeo();
    this.candidateService.deleteAllCandidate();
    this.candidateService.createIndexGeo();
    this.departmentService.deleteAllDepartment();
    this.departmentService.createIndexGeo();
  }

  private async fetchAdressFromGouv(): Promise<any> {
    const formData = new FormData();
    formData.append('data', fs.createReadStream('./sponsorships.csv'));
    formData.append('columns', 'district');
    formData.append('columns', 'department');
    formData.append('columns', 'region');
    formData.append('delimiter', ',');
    const res = await fetch(this.URL_SEARCH_ADDRESS, { method: 'POST', body: formData });
    const text = await res.text();
    fs.writeFile('sponsorships-ville.csv', text, async (err) => {
    });
    const data = await csv({ noheader: true, output: 'csv', delimiter: ',' }).fromString(text);
    data.shift();
    return (data);
  }
}
