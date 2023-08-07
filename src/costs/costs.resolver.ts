import { Injectable } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { CompaniesService } from '../companies/companies.service';
import { TravelsService } from '../travels/travels.service';

@Injectable()
@Resolver()
export class CostsResolver {
  constructor(
    private companiesService: CompaniesService,
    private travelsService: TravelsService,
  ) {}
  @Query()
  async costsData() {
    try {
      const [companies, travels] = await Promise.all([
        this.companiesService.fetchCompaniesData(),
        this.travelsService.fetchTravelsData(),
      ]);

      const responseData = this.processCompanies(companies, travels);
      return responseData;
    } catch (error) {
      console.error('Error in costsData resolver:', error);
      throw error;
    }
  }

  private processCompanies(companies: any[], travels: any[]): any[] {
    return companies.map((company) => ({
      id: company.id,
      createdAt: company.createdAt,
      name: company.name,
      parentId: company.parentId,
      cost: this.calculateTotalTravelCost(
        company.id,
        companies,
        travels,
      ).toFixed(2),
      children: this.createSubCompanies(company, companies, travels),
    }));
  }

  private createSubCompanies(
    company: any,
    companies: any[],
    travels: any[],
  ): any[] {
    const childCompanies = companies.filter(
      (child) => child.parentId === company.id,
    );

    return childCompanies.map((childCompany) => ({
      id: childCompany.id,
      createdAt: childCompany.createdAt,
      name: childCompany.name,
      parentId: childCompany.parentId,
      cost: this.calculateTotalTravelCost(
        childCompany.id,
        companies,
        travels,
      ).toFixed(2),
      children: this.createSubCompanies(childCompany, companies, travels),
    }));
  }

  private calculateTotalTravelCost(
    companyId: string,
    companies: any[],
    travels: any[],
  ): number {
    const companyIds = this.getChildCompanyIds(companyId, companies);
    const companyTravels = travels.filter((travel) =>
      companyIds.includes(travel.companyId),
    );
    return companyTravels.reduce(
      (total, travel) =>
        total +
        (this.isValidNumber(travel.price) ? parseFloat(travel.price) : 0),
      0,
    );
  }

  private isValidNumber(value: any): boolean {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }

  private getChildCompanyIds(companyId: string, companies: any[]): string[] {
    const childIds = companies
      .filter((company) => company.parentId === companyId)
      .map((company) => company.id);
    let allChildIds = [...childIds];
    for (const childId of childIds) {
      allChildIds = allChildIds.concat(
        this.getChildCompanyIds(childId, companies),
      );
    }
    return allChildIds;
  }
}
