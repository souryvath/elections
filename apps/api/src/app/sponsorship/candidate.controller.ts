import { Controller, Get, Res, Query, HttpStatus } from '@nestjs/common';
import { Department } from './interfaces/department.interface';
import { CandidateService } from './candidate.service';

@Controller()
export class CandidateController {
  constructor(
    private readonly candidateService: CandidateService,
    ) { }


  @Get('candidate')
  async getSponsorship(@Res() res, @Query() params): Promise<Department[]> {
    let candidates = null;
    if (params.field && params.value) {
      candidates = await this.candidateService.findCandidate(params.field, params.value);
    } else {
      candidates = await this.candidateService.findAllCandidates();
    }
    return res.status(HttpStatus.OK).json(candidates);
  }

  @Get('candidate/ranking')
  async getRanking(@Res() res, @Query() params): Promise<Department[]> {
    let candidates = await this.candidateService.rankingCandidate();
    return res.status(HttpStatus.OK).json(candidates);
  }

  @Get('candidates')
  async getCandidates(@Res() res, @Query() params): Promise<Department[]> {
    let candidates = await this.candidateService.findDistinctCandidates(params.query);
    return res.status(HttpStatus.OK).json(candidates);
  }
}
