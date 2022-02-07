import { TwitterService } from './twitter.service';
import { SocialNetworkController } from './social-network.controller';
import { Module } from "@nestjs/common";

@Module({
  imports: [
  ],
  controllers: [
    SocialNetworkController
  ],
  providers: [
    TwitterService
  ]
})
export class SocialNetworkModule { }
