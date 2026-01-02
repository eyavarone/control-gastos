import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GastoCompleto, calcularEstadoGasto, estaCompletamentePagado, estaParcialmentePagado } from '../../../models/gasto.model';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog';
import { MontoModalComponent } from '../monto-modal/monto-modal';

/**
 * Componente para mostrar un item de gasto
 */
@Component({
  selector: 'app-gasto-item',
  standalone: true,
  imports: [CommonModule, ConfirmDialogComponent, MontoModalComponent],
  templateUrl: './gasto-item.html',
  styleUrl: './gasto-item.css'
})
export class GastoItemComponent {
  @Input() gasto!: GastoCompleto;

  @Output() confirmar = new EventEmitter<{ id: string, monto: number }>();
  @Output() registrarPago = new EventEmitter<{ id: string, monto: number }>();
  @Output() editar = new EventEmitter<string>();
  @Output() eliminar = new EventEmitter<string>();

  // Estados de los modales
  showConfirmMontoModal = false;
  showPagoModal = false;
  showDeleteConfirm = false;

  /**
   * Obtiene el estado del gasto
   */
  getEstado(): string {
    return calcularEstadoGasto(this.gasto);
  }

  /**
   * Verifica si el gasto está completamente pagado
   */
  isCompletamentePagado(): boolean {
    return estaCompletamentePagado(this.gasto);
  }

  /**
   * Verifica si el gasto está parcialmente pagado
   */
  isParcialmentePagado(): boolean {
    return estaParcialmentePagado(this.gasto);
  }

  /**
   * Obtiene la clase CSS según el estado
   */
  getEstadoClass(): string {
    const estado = this.getEstado();
    if (estado === 'Pagado' && this.isCompletamentePagado()) {
      return 'estado-pagado-completo';
    } else if (estado === 'Pagado' && this.isParcialmentePagado()) {
      return 'estado-pagado-parcial';
    } else if (estado === 'Confirmado') {
      return 'estado-confirmado';
    }
    return 'estado-pendiente';
  }

  /**
   * Formatea un número como moneda
   */
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(amount);
  }

  /**
   * Abre el modal para confirmar monto
   */
  onConfirmarClick(): void {
    this.showConfirmMontoModal = true;
  }

  /**
   * Confirma el monto del gasto
   */
  onConfirmarMonto(monto: number): void {
    this.confirmar.emit({ id: this.gasto.id, monto });
    this.showConfirmMontoModal = false;
  }

  /**
   * Abre el modal para registrar pago
   */
  onPagarClick(): void {
    this.showPagoModal = true;
  }

  /**
   * Registra el pago del gasto
   */
  onRegistrarPago(monto: number): void {
    this.registrarPago.emit({ id: this.gasto.id, monto });
    this.showPagoModal = false;
  }

  /**
   * Emite el evento para editar
   */
  onEditarClick(): void {
    this.editar.emit(this.gasto.id);
  }

  /**
   * Abre el modal de confirmación de eliminación
   */
  onEliminarClick(): void {
    this.showDeleteConfirm = true;
  }

  /**
   * Confirma la eliminación del gasto
   */
  onConfirmarEliminar(): void {
    this.eliminar.emit(this.gasto.id);
    this.showDeleteConfirm = false;
  }

  /**
   * Cierra los modales
   */
  onCancelarModal(): void {
    this.showConfirmMontoModal = false;
    this.showPagoModal = false;
    this.showDeleteConfirm = false;
  }
}
