import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { CostsModule } from './costs/costs.module';
import { CompaniesService } from './companies/companies.service';
import { TravelsService } from './travels/travels.service';
import { CostsResolver } from './costs/costs.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
    }),
    CostsModule,
  ],
  controllers: [],
  providers: [CompaniesService, TravelsService, CostsResolver],
})
export class AppModule {}
