import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faPinterest, faTiktok, faTwitter } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isBrowser = isPlatformBrowser(this.platformId);
  constructor(
    library: FaIconLibrary,
    @Inject(PLATFORM_ID) private readonly platformId: any,
    public router: Router) {
    library.addIcons(faFacebook, faTwitter, faInstagram, faTiktok, faLinkedin, faPinterest); //Browse icons https://fontawesome.com/v5.15/icons
    // features https://github.com/FortAwesome/angular-fontawesome/blob/master/docs/usage/features.md
  }
}


