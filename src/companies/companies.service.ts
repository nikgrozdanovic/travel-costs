import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';

@Injectable()
export class CompaniesService {
  private readonly logger = new Logger(CompaniesService.name);
  async fetchCompaniesData(): Promise<any[]> {
    const apiUrl = `https://5f27781bf5d27e001612e057.mockapi.io/webprovise/companies`;
    try {
      const response: AxiosResponse = await axios.get(apiUrl);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      this.logger.error('Error fetching data from route1:', error);
      throw error;
    }
  }
}
