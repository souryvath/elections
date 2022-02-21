import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-sponsorship',
  templateUrl: './sponsorship.component.html',
  styleUrls: ['./sponsorship.component.scss']
})
export class SponsorshipComponent implements OnInit {

  isBrowser = isPlatformBrowser(this.platformId);
  constructor(@Inject(PLATFORM_ID) private readonly platformId: any) { }

  ngOnInit(): void {
  }


}
