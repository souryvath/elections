import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SEO } from '../../config/seo.config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  url = SEO;
  isActive = false;
  isExpand = true;
  constructor(public router: Router) { }

  expand(): void {
    this.isActive = !this.isActive;
  }

  toggleMenu(e: any): void {
    const menu = e.currentTarget.querySelector('.navbar-dropdown');
    if (e.target.parentElement.classList.contains('navbar-dropdown')) {
      menu.style.display = 'none';
    }
    setTimeout(() => {
      menu.style.display = '';
      e.target.blur();
    }, 100);
  }
}
