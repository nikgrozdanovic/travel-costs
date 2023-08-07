import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';

@Injectable()
export class TravelsService {
  private readonly logger = new Logger(TravelsService.name);
  async fetchTravelsData(): Promise<any[]> {
    const apiUrl = `https://5f27781bf5d27e001612e057.mockapi.io/webprovise/travels`;
    try {
      const response: AxiosResponse = await axios.get(apiUrl);
      return response.data;
    } catch (error) {
      this.logger.error('Error fetching data from route1:', error);
      throw error;
    }
  }
}
