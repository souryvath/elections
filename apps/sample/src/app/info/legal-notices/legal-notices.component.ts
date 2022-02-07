import { Component, OnInit } from '@angular/core';
import { URL_DOMAIN } from '../../config/url.config';

@Component({
  selector: 'app-legal-notices',
  templateUrl: './legal-notices.component.html',
  styleUrls: ['./legal-notices.component.scss']
})
export class LegalNoticesComponent implements OnInit {

  URL = URL_DOMAIN.main;
  constructor() { }

  ngOnInit(): void {
  }

}
