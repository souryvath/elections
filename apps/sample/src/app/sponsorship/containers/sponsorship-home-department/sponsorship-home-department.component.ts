import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeoService } from '../../../core/services/seo.service';
import { FRANCE_DEPS_LIST } from '../sponsorship-department/departments.constant';

@Component({
  selector: 'app-sponsorship-home-department',
  templateUrl: './sponsorship-home-department.component.html',
  styleUrls: ['./sponsorship-home-department.component.scss']
})
export class SponsorshipHomeDepartmentComponent implements OnInit {

  results: any[];
  departments: any[];
  todayDate: any = Date.now();
  constructor(
    private readonly seoService: SeoService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.departments = FRANCE_DEPS_LIST;
    this.setSeo();
  }

  search($event): void {
    this.results = FRANCE_DEPS_LIST.filter((element) => element.name.toLowerCase().includes($event.query));
  }

  select($event, type) {
    if ($event) {
      this.router.navigate([type, $event.slug]);
    }
  }

  private setSeo(): void {
    this.seoService.setSeoPage(
      'Carte des parrainages présidentielles 2022 par département et par ville',
      'Retrouvez la carte des parrainages pour les présidentielles 2022 par département et par ville, avec la liste et le nombre parrainages, ainsi que les candidats soutenus'
    );
  }
}
