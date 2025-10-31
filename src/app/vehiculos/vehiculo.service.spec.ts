import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { VehiculoService } from './vehiculo.service';
import { Vehiculo } from './vehiculo.model';
import { faker } from '@faker-js/faker';

describe('VehiculoService (HTTP)', () => {
  let service: VehiculoService;
  let httpMock: HttpTestingController;

  beforeAll(() => {
    faker.seed(12345);
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(VehiculoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should GET vehiculos from API (mock con faker)', () => {
    const brand = faker.helpers.arrayElement(['Renault', 'Chevrolet', 'Nissan']);
    const mock: Vehiculo[] = [
      {
        id: faker.number.int({ min: 1, max: 9999 }),
        marca: brand,
        linea: faker.vehicle.model(),
        modelo: faker.number.int({ min: 2010, max: 2024 }),
      } as Vehiculo,
    ];

    service.getVehiculos().subscribe((data) => {
      expect(data.length).toBe(1);
      expect(data[0]).toEqual(mock[0]);
    });

    const req = httpMock.expectOne(
      (r) => r.method === 'GET' && r.url.includes('202212_MISW4104_Grupo1.json')
    );
    expect(req.request.method).toBe('GET');
    req.flush(mock);
  });
});
