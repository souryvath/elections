import { Component, OnInit } from '@angular/core';
import { URL_DOMAIN } from '../../config/url.config';

@Component({
  selector: 'app-cgu',
  templateUrl: './cgu.component.html',
  styleUrls: ['./cgu.component.scss']
})
export class CguComponent implements OnInit {

  URL = URL_DOMAIN.main;
  constructor() { }

  ngOnInit(): void {
  }

}
