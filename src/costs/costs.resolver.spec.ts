import { CostsResolver } from './costs.resolver';
import { CompaniesService } from '../companies/companies.service';
import { TravelsService } from '../travels/travels.service';

describe('CostsResolver', () => {
  let costsResolver: CostsResolver;
  let companiesService: CompaniesService;
  let travelsService: TravelsService;

  beforeEach(() => {
    companiesService = new CompaniesService();
    travelsService = new TravelsService();
    costsResolver = new CostsResolver(companiesService, travelsService);
  });

  describe('costsData', () => {
    it('should return correct data', async () => {
      const mockCompanies = [
        {
          id: 'uuid-1',
          createdAt: '2021-02-26T00:55:36.632Z',
          name: 'Webprovise Corp',
          parent_id: '0',
          cost: '66888',
        },
      ];

      const mockTravels = [
        {
          id: 'uuid-t1',
          createdAt: '2020-11-08T22:44:37.483Z',
          employeeName: 'John Doe',
          departure: 'USA',
          destination: 'UK',
          price: '1000',
          companyId: 'uuid-1',
        },
      ];

      jest
        .spyOn(companiesService, 'fetchCompaniesData')
        .mockResolvedValue(mockCompanies);
      jest
        .spyOn(travelsService, 'fetchTravelsData')
        .mockResolvedValue(mockTravels);

      const result = await costsResolver.costsData();
      console.log(result);
      expect(result).toEqual([
        {
          id: 'uuid-1',
          createdAt: '2021-02-26T00:55:36.632Z',
          name: 'Webprovise Corp',
          parentId: undefined,
          cost: '0.00',
          children: [],
        },
      ]);
    });
  });
});
