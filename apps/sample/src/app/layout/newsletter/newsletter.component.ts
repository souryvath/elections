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
  }

}
