import { CANDIDATES_PRESIDENTIAL_FRONT } from './../../../shared/constants/candidates.constants';
import { Observable, tap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JsonLdService } from 'ngx-seo';
import { BreadcrumbService } from 'xng-breadcrumb';
import { SeoService } from '../../../core/services/seo.service';
import { PresidentialService } from '../../services/presidential.service';

@Component({
  selector: 'app-presidential-candidate-sheet',
  templateUrl: './presidential-candidate-sheet.component.html',
  styleUrls: ['./presidential-candidate-sheet.component.scss']
})
export class PresidentialCandidateSheetComponent implements OnInit {

  result$: Observable<any>;
  type = 'candidate';
  resultRound = [];
  departement$: Observable<any>;
  resultRegion: any;
  resultDepartement: any;
  constructor(
    public router: Router,
    private readonly route: ActivatedRoute,
    private readonly breadcrumbService: BreadcrumbService,
    private readonly presidentialService: PresidentialService,
    private readonly jsonLdService: JsonLdService,
    private readonly seoService: SeoService
  ) { }

  ngOnInit(): void {
    const candidateParams = this.route.snapshot.params['slugCandidate'];
    this.result$ = this.presidentialService.getCandidate(candidateParams, 'national').pipe(tap((element) => {
      this.resultRound = element;
      this.resultRound.forEach((item) => {
        const candidate = CANDIDATES_PRESIDENTIAL_FRONT.find((candItem) => candItem.slug === candidateParams);
        const candidatesRanking = item.candidates.sort((a, b) => (Number(a.pctVotesOnExprimated) > Number(b.pctVotesOnExprimated)) ? -1 : 1);
        const rank = candidatesRanking.findIndex((item) => item.slug === candidateParams);
        item.candidates = item.candidates.filter((itemCandidate) => itemCandidate.slug === candidateParams);
        item.ranking = rank + 1;
        item.name = candidate.name;
      });
      this.presidentialService.getCandidate(candidateParams, 'region').subscribe((result) => {
        const regionRound1 = result.filter((item) => item.round === '1').sort((a, b) => (Number(a.candidate.pctVotesOnExprimated) > Number(b.candidate.pctVotesOnExprimated)) ? -1 : 1);
        const regionRound2 = result.filter((item) => item.round === '2').sort((a, b) => (Number(a.candidate.pctVotesOnExprimated) > Number(b.candidate.pctVotesOnExprimated)) ? -1 : 1);
        this.resultRegion = [];
        if (regionRound1.length > 0) {
          this.resultRegion.push({
            round: '1',
            regions: regionRound1
          });
        }
        if (regionRound2.length > 0) {
          this.resultRegion.push({
            round: '2',
            regions: regionRound2
          });
        }
        console.log(this.resultRegion);
      })

      this.presidentialService.getCandidate(candidateParams, 'departement').subscribe((result) => {
        const departementRound1 = result.filter((item) => item.round === '1').sort((a, b) => (Number(a.candidate.pctVotesOnExprimated) > Number(b.candidate.pctVotesOnExprimated)) ? -1 : 1);
        const departementRound2 = result.filter((item) => item.round === '2').sort((a, b) => (Number(a.candidate.pctVotesOnExprimated) > Number(b.candidate.pctVotesOnExprimated)) ? -1 : 1);
        this.resultDepartement = [];
        if (departementRound1.length > 0) {
          this.resultDepartement.push({
            round: '1',
            departements: departementRound1
          });
        }
        if (departementRound2.length > 0) {
          this.resultDepartement.push({
            round: '2',
            departements: departementRound2
          });
        }
        console.log(this.resultRegion);
      })
    }));
  }

}
