import { Component, OnInit } from '@angular/core';
import { VehiculoService } from '../vehiculo.service';
import { Vehiculo } from '../vehiculo.model';

@Component({
  selector: 'app-vehiculo-list',
  templateUrl: './vehiculo-list.component.html',
})
export class VehiculoListComponent implements OnInit {
  vehiculos: Vehiculo[] = [];
  loading = true;
  error = '';

  constructor(private vehiculoService: VehiculoService) {}

  ngOnInit(): void {
    this.vehiculoService.getVehiculos().subscribe({
      next: data => { this.vehiculos = data; this.loading = false; },
      error: () => { this.error = 'No fue posible cargar los vehículos.'; this.loading = false; }
    });
  }
}
