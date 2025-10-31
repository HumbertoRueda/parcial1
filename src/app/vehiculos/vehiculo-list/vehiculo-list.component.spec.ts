import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { VehiculoListComponent } from './vehiculo-list.component';
import { VehiculoService } from '../vehiculo.service';
import { Vehiculo } from '../vehiculo.model';
import { faker } from '@faker-js/faker';

describe('VehiculoListComponent', () => {
  let fixture: ComponentFixture<VehiculoListComponent>;
  let component: VehiculoListComponent;

  beforeAll(() => {
    faker.seed(12345);
  });

  const BRANDS = ['Renault', 'Chevrolet', 'Nissan'];

  const makeVehiculo = (id: number): Vehiculo => ({
    id,
    marca: faker.helpers.arrayElement(BRANDS),
    linea: faker.vehicle.model(),
    modelo: faker.number.int({ min: 2015, max: 2022 }),
  } as Vehiculo);

  const mockVehiculos: Vehiculo[] = Array.from({ length: 3 }, (_, i) => makeVehiculo(i + 1));

  const vehiculoServiceStub = {
    getVehiculos: () => of(mockVehiculos),
  };

  beforeEach(waitForAsync(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [VehiculoListComponent],
      providers: [{ provide: VehiculoService, useValue: vehiculoServiceStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(VehiculoListComponent);
    component = fixture.componentInstance;
  }));

  it('debe crear la tabla con 3 filas más el encabezado', async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement;
    const table = host.querySelector('table');
    expect(table).toBeTruthy();

    const headerRows = table!.querySelectorAll('thead tr');
    const bodyRows   = table!.querySelectorAll('tbody tr');
    expect(headerRows.length).toBe(1);
    expect(bodyRows.length).toBe(3);
  });
});
