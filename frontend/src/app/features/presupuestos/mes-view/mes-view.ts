import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MockDataService } from '../../../services/mock-data.service';
import { MesConTotales } from '../../../models/mes.model';
import { GastoCompleto } from '../../../models/gasto.model';
import { Ingreso } from '../../../models/ingreso.model';
import { TotalizadoresComponent } from '../../../shared/components/totalizadores/totalizadores';
import { GastoItemComponent } from '../../../shared/components/gasto-item/gasto-item';
import { IngresoItemComponent } from '../../../shared/components/ingreso-item/ingreso-item';

/**
 * Componente para visualizar un mes con sus gastos e ingresos
 */
@Component({
  selector: 'app-mes-view',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    TotalizadoresComponent,
    GastoItemComponent,
    IngresoItemComponent
  ],
  templateUrl: './mes-view.html',
  styleUrl: './mes-view.css'
})
export class MesViewComponent implements OnInit {
  mes: MesConTotales | null = null;
  loading = false;
  
  // Arrays para los gastos e ingresos
  gastosFijos: GastoCompleto[] = [];
  gastosVariables: GastoCompleto[] = [];
  ingresosFijos: Ingreso[] = [];
  ingresosVariables: Ingreso[] = [];

  constructor(
    private route: ActivatedRoute,
    private mockDataService: MockDataService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const mesId = params['mesId'];
      if (mesId) {
        this.cargarMes(mesId);
      }
    });
  }

  /**
   * Carga el mes con sus gastos e ingresos
   */
  cargarMes(mesId: string): void {
    this.loading = true;
    this.mockDataService.getMesCompleto(mesId).subscribe({
      next: (mes) => {
        this.mes = mes;
        if (mes) {
          this.organizarDatos(mes);
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar mes:', error);
        this.loading = false;
      }
    });
  }

  /**
   * Organiza los gastos e ingresos por tipo
   */
  private organizarDatos(mes: MesConTotales): void {
    this.gastosFijos = mes.gastos.filter(g => g.tipo === 'Fijo') as GastoCompleto[];
    this.gastosVariables = mes.gastos.filter(g => g.tipo === 'Variable') as GastoCompleto[];
    this.ingresosFijos = mes.ingresos.filter(i => i.tipo === 'Fijo');
    this.ingresosVariables = mes.ingresos.filter(i => i.tipo === 'Variable');
  }

  /**
   * Retorna el nombre del mes
   */
  getNombreMes(): string {
    if (!this.mes) return '';
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                   'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return `${meses[this.mes.mes - 1]} ${this.mes.año}`;
  }

  // ===== Acciones de Gastos =====

  /**
   * Confirma el monto de un gasto
   */
  onConfirmarGasto(data: { id: string, monto: number }): void {
    console.log('Confirmar gasto:', data);
    // TODO: Implementar lógica de confirmación con el servicio
    // Por ahora solo mostramos en consola
    alert(`Gasto confirmado: $${data.monto}`);
  }

  /**
   * Registra el pago de un gasto
   */
  onRegistrarPagoGasto(data: { id: string, monto: number }): void {
    console.log('Registrar pago gasto:', data);
    // TODO: Implementar lógica de pago con el servicio
    alert(`Pago registrado: $${data.monto}`);
  }

  /**
   * Edita un gasto
   */
  onEditarGasto(id: string): void {
    console.log('Editar gasto:', id);
    // TODO: Navegar al formulario de edición o abrir modal
    alert(`Editar gasto: ${id}`);
  }

  /**
   * Elimina un gasto
   */
  onEliminarGasto(id: string): void {
    console.log('Eliminar gasto:', id);
    // TODO: Implementar lógica de eliminación con el servicio
    alert(`Gasto eliminado: ${id}`);
  }

  // ===== Acciones de Ingresos =====

  /**
   * Confirma el monto de un ingreso
   */
  onConfirmarIngreso(data: { id: string, monto: number }): void {
    console.log('Confirmar ingreso:', data);
    // TODO: Implementar lógica de confirmación con el servicio
    alert(`Ingreso confirmado: $${data.monto}`);
  }

  /**
   * Registra la recepción de un ingreso
   */
  onRegistrarRecepcionIngreso(data: { id: string, monto: number }): void {
    console.log('Registrar recepción ingreso:', data);
    // TODO: Implementar lógica de recepción con el servicio
    alert(`Recepción registrada: $${data.monto}`);
  }

  /**
   * Edita un ingreso
   */
  onEditarIngreso(id: string): void {
    console.log('Editar ingreso:', id);
    // TODO: Navegar al formulario de edición o abrir modal
    alert(`Editar ingreso: ${id}`);
  }

  /**
   * Elimina un ingreso
   */
  onEliminarIngreso(id: string): void {
    console.log('Eliminar ingreso:', id);
    // TODO: Implementar lógica de eliminación con el servicio
    alert(`Ingreso eliminado: ${id}`);
  }
}
