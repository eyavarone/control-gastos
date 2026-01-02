import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MockDataService } from '../../../services/mock-data.service';
import { Hogar } from '../../../models/hogar.model';

/**
 * Componente para mostrar la lista de hogares del usuario
 */
@Component({
  selector: 'app-hogar-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hogar-list.html',
  styleUrls: ['./hogar-list.css']
})
export class HogarListComponent implements OnInit {
  hogares: Hogar[] = [];
  loading = false;

  constructor(private mockDataService: MockDataService) {}

  ngOnInit(): void {
    this.cargarHogares();
  }

  /**
   * Carga la lista de hogares del usuario
   */
  cargarHogares(): void {
    this.loading = true;
    this.mockDataService.getHogares().subscribe({
      next: (hogares) => {
        this.hogares = hogares;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar hogares:', error);
        this.loading = false;
      }
    });
  }
}
