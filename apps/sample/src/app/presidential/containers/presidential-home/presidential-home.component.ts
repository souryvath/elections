import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreadcrumbService } from 'xng-breadcrumb';
import { FRANCE_DEPS_LIST } from '../../../shared/constants/departments.constant';
import { FRANCE_REGIONS } from '../../../shared/constants/regions.constant';
import { PresidentialService } from '../../services/presidential.service';

@Component({
  selector: 'app-presidential-home',
  templateUrl: './presidential-home.component.html',
  styleUrls: ['./presidential-home.component.scss']
})
export class PresidentialHomeComponent implements OnInit {

  result$: Observable<any>;
  type = 'France';
  listDepartements: any[] = FRANCE_DEPS_LIST.filter((item) => item.code !== 'FR-EU');
  listRegions: any[] = FRANCE_REGIONS;
  listCity$: Observable<any>;
  constructor(
    private readonly breadcrumbService: BreadcrumbService,
    private readonly presidentialService: PresidentialService
  ) { }

  ngOnInit(): void {
    this.result$ = this.presidentialService.getFranceResult();
    this.listCity$ = this.presidentialService.getMostVotedCities();
  }

}
