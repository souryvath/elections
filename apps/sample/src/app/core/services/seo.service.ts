import { Inject, Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { URL_DOMAIN } from '../../config/url.config';
import { SEO } from '../../config/seo.config';
import { JsonLdService } from 'ngx-seo';
import { JsonLd } from 'ngx-seo/lib/json-ld';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private readonly title: Title,
    private readonly meta: Meta,
    private readonly jsonLdService: JsonLdService,
    @Inject(DOCUMENT) private doc: any
  ) {}

  setSeoPage(title: string, description: string, image?: string): void {
    const APP_TITLE = title;
    const APP_DESCRIPTION = description;
    const APP_IMAGE = image || SEO.social;
    const APP_META = [
      { name: 'description', content: APP_DESCRIPTION },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: URL_DOMAIN.main },
      { property: 'og:url', content: `${URL_DOMAIN.main}` },
      { property: 'og:title', content: APP_TITLE },
      { property: 'og:description', content: APP_DESCRIPTION },
      { property: 'og:image', content: APP_IMAGE },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: APP_TITLE },
      { name: 'twitter:description', content: APP_DESCRIPTION },
      { name: 'twitter:image', content: APP_IMAGE },
    ];
    this.setTitle(APP_TITLE);
    this.setMetaTags(APP_META);
  }

  setJsonLdObject(JSON_LD_OBJECT: JsonLd): void {
    const jsonLdObject = this.jsonLdService.getObject('Organization', JSON_LD_OBJECT);
    this.jsonLdService.setData(jsonLdObject);
  }

  createLinkForCanonicalURL() {
    let link: HTMLLinkElement = this.doc.createElement('link');
    link.setAttribute('rel', 'canonical');
    this.doc.head.appendChild(link);
    link.setAttribute('href', this.doc.URL);
 }

  private setTitle(title: string): void {
    this.title.setTitle(title);
  }

  private setMetaTags(tags: any[]): void {
    tags.forEach((tag) => {
      this.meta.updateTag(tag);
    });
  }



}
