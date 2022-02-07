import { NavigationEnd, Router } from '@angular/router';
import { Component, Inject, OnInit, PLATFORM_ID, OnDestroy } from '@angular/core';
import { PostalCodeService } from '../../core/services/postal-code.service';
import { SeoService } from '../../core/services/seo.service';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  isBrowser = isPlatformBrowser(this.platformId);
  title = 'app';
  subscriptionRouter: Subscription;
  city: any;
  results: string[];
  isNotFound = false;
  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: any,
    private readonly seoService: SeoService,
    private readonly postalCodeService: PostalCodeService,
    private router: Router
  ) {
    this.reloadPage();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.subscriptionRouter) {
      this.subscriptionRouter.unsubscribe();
    }
  }

  search($event): void {
    console.log($event);
    this.postalCodeService.getPostalCodes($event.query).subscribe(data => {
      this.results = data;
    });
  }

  findLocalisation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.postalCodeService.getReverse(position.coords.latitude, position.coords.longitude).subscribe((result) => {
          this.postalCodeService.getPostalCodesByInsee(result.features[0].properties.citycode).subscribe((res) => {
            if (res) {
              this.router.navigate(['controle-technique', res.slug]);
              this.isNotFound = false;
            } else {
              this.isNotFound = true;
            }
          })
        });
      },
      (error) => {
        this.isNotFound = true;
    });
    }
  }

  select($event, type) {
    if ($event) {
      this.router.navigate([type, $event.slug]);
    }
  }


  goToCityPage($event): void {
    this.city = $event;
    console.log(this.city);
  }

  private setSeo(): void {
    this.seoService.setSeoPage('TITRE A MODIFIER', 'DESCRIPTION A MODIFIER', 'IMAGE A MODIFIER');
    const JSON_LD_OBJECT = {
      '@id': ``,
      name: ``,
      address: {
        '@type': 'PostalAddress',
        'streetAddress': ``,
        'addressLocality': ``,
        'postalCode': ``,
        'addressCountry': 'FR'
      },
      url: ``,
      telephone: ``,
      email: ``
    };
    this.seoService.setJsonLdObject(JSON_LD_OBJECT);
  }

  private reloadPage(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.subscriptionRouter = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
         this.router.navigated = false;
      }
    });
  }

}
