import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VehiculosModule } from "./vehiculos/vehiculos.module";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, VehiculosModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'parcial1';
}
