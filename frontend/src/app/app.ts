import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Componente principal de la aplicación
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'Control Gastos';
}
