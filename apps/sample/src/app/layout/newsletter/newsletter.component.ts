import { Component, Renderer2, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements AfterViewInit {

  constructor(
    private renderer: Renderer2
  ) { }

  ngAfterViewInit(): void {
    const script = this.renderer.createElement('script');
    script.src = `https://sibforms.com/forms/end-form/build/main.js`;
    this.renderer.appendChild(document.head, script);
    const script2 = this.renderer.createElement('script');
    script2.innerText  = `  window.REQUIRED_CODE_ERROR_MESSAGE = 'Veuillez choisir un code pays';
    window.LOCALE = 'fr';
    window.EMAIL_INVALID_MESSAGE = window.SMS_INVALID_MESSAGE = "Les informations que vous avez fournies ne sont pas valides. Veuillez vérifier le format du champ et réessayer.";
    window.REQUIRED_ERROR_MESSAGE = "Vous devez renseigner ce champ. ";
    window.GENERIC_INVALID_MESSAGE = "Les informations que vous avez fournies ne sont pas valides. Veuillez vérifier le format du champ et réessayer.";
    window.translation = {
      common: {
        selectedList: '{quantity} liste sélectionnée',
        selectedLists: '{quantity} listes sélectionnées'
      }
    };

    var AUTOHIDE = Boolean(0);`;
    this.renderer.appendChild(document.head, script2);
  }

}
