import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostalCodeService } from '../../../core/services/postal-code.service';

@Component({
  selector: 'app-presidential-search',
  templateUrl: './presidential-search.component.html',
  styleUrls: ['./presidential-search.component.scss']
})
export class PresidentialSearchComponent implements OnInit {

  results: any[];
  constructor(
    public router: Router,
    private readonly postalCodeService: PostalCodeService
  ) { }

  ngOnInit(): void {
  }

  search($event): void {
    this.postalCodeService.getPostalCodes($event.query).subscribe(data => {
      this.results = data;
    });
  }

  select($event, type) {
    if ($event) {
      this.router.navigate([type, $event.slug]);
    }
  }

}
