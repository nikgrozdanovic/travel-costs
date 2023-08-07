import { Module } from '@nestjs/common';
import { CostsService } from './costs.service';
import { CostsResolver } from './costs.resolver';
import { CompaniesService } from 'src/companies/companies.service';
import { TravelsService } from 'src/travels/travels.service';

@Module({
  providers: [CostsService, CostsResolver, CompaniesService, TravelsService],
})
export class CostsModule {}
