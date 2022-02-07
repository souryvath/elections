import { Injectable } from "@nestjs/common";
import { TWITTER_KEYS } from "./social-network.constant";

const Twitter = require('twitter-lite');
const fs = require('fs');
const path = require('path');

@Injectable()
export class TwitterService {

  constructor() {}

  newClient(subdomain)  {
    const client = new Twitter({
      subdomain: subdomain,
      version: "1.1",
      consumer_key: TWITTER_KEYS.consumer_key,
      consumer_secret: TWITTER_KEYS.consumer_secret, // from Twitter.
      access_token_key: TWITTER_KEYS.access_token_key,
      access_token_secret: TWITTER_KEYS.access_token_secret,
    });
    return (client);
  }

  async screenPage(url: string, selector: string, filename: string): Promise<any> {
    const puppeteer = require('puppeteer');
    console.log('screen Page');
    try {
      const browser = await puppeteer.launch(
        {
          headless: true,
          args: [
              "--disable-gpu",
              "--disable-dev-shm-usage",
              "--disable-setuid-sandbox",
              "--no-sandbox",
          ]
      }
      );
      const page = await browser.newPage();
      page.setViewport({ width: 1600, height: 900, deviceScaleFactor: 4 });
      await page.goto(url);
      await page.waitForSelector(selector);
      const element = await page.$(selector);
      await element.screenshot({path: path.join(__dirname, filename)});
      console.log('screen done');
      return (await browser.close());
    } catch (error) {
      console.log(error);
    }
  }

  private async upload(filename: string): Promise<any> {
    const uploadClient = this.newClient('upload');
    const mediaFile = fs.readFileSync(path.join(__dirname, filename));
    const base64image = Buffer.from(mediaFile).toString('base64');
    const media = await uploadClient.post('media/upload', { media_data: base64image });
    return (media.media_id_string);
  }

  private async post(mediaId: string, status: string): Promise<any> {
    const apiClient = this.newClient('api');
    const post = apiClient.post('statuses/update', { status, media_ids: mediaId });
    return (post);
  }

  async postWithImage(url, filename, selector, status): Promise<any> {
    await this.screenPage(url, selector, filename);
    const mediaId = await this.upload(filename);
    await this.post(mediaId, status);
    console.log('post done');
    return (mediaId);
  }
}
