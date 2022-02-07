import { Component } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faPinterest, faTiktok, faTwitter } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(library: FaIconLibrary) {
    library.addIcons(faFacebook, faTwitter, faInstagram, faTiktok, faLinkedin, faPinterest); //Browse icons https://fontawesome.com/v5.15/icons
    // features https://github.com/FortAwesome/angular-fontawesome/blob/master/docs/usage/features.md
  }

}


