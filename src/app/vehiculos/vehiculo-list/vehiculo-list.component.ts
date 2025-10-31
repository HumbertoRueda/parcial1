import { Component, OnInit } from '@angular/core';
import { VehiculoService } from '../vehiculo.service';
import { Vehiculo } from '../vehiculo.model';

@Component({
  selector: 'app-vehiculo-list',
  templateUrl: './vehiculo-list.component.html',
  styleUrls: ['./vehiculo-list.component.scss'],
})
export class VehiculoListComponent implements OnInit {
  vehiculos: Vehiculo[] = [];
  loading = true;
  error = '';

  brandSummary: { brand: string; count: number }[] = [];

  constructor(private vehiculoService: VehiculoService) {}

  ngOnInit(): void {
    this.vehiculoService.getVehiculos().subscribe({
      next: data => {
        this.vehiculos = data;
        this.computeBrandSummary(this.vehiculos);
        this.loading = false;
      },
      error: () => {
        this.error = 'No fue posible cargar los vehículos.';
        this.loading = false;
      }
    });
  }

  private computeBrandSummary(list: Vehiculo[]) {
    const map = new Map<string, number>();
    for (const v of list) {
      const key = (v.marca ?? 'Sin marca').trim();
      map.set(key, (map.get(key) ?? 0) + 1);
    }
    this.brandSummary = Array.from(map, ([brand, count]) => ({ brand, count }));
  }
}
