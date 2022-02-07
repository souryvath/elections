import { TwitterService } from './twitter.service';
import { Controller, Post } from "@nestjs/common";

@Controller()
export class SocialNetworkController {

  constructor(
      private readonly twitterService: TwitterService
    ) { }

    @Post('social/twitter')
    async scrapPage(): Promise<any> {
      const URL_PAGE = 'https://www.applivoiture.fr/infos/twitter';
      const IMAGE_PATH = 'applivoiture.png';
      const SELECTOR = '#twitter';
      const STATUS = 'status';
      return this.twitterService.postWithImage(URL_PAGE, IMAGE_PATH, SELECTOR, STATUS);
    }
}
