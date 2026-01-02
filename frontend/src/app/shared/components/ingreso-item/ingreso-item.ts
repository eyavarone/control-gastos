import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ingreso, calcularEstadoIngreso, estaCompletamenteRecibido, estaParcialmenteRecibido } from '../../../models/ingreso.model';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog';
import { MontoModalComponent } from '../monto-modal/monto-modal';

/**
 * Componente para mostrar un item de ingreso
 */
@Component({
  selector: 'app-ingreso-item',
  standalone: true,
  imports: [CommonModule, ConfirmDialogComponent, MontoModalComponent],
  templateUrl: './ingreso-item.html',
  styleUrl: './ingreso-item.css'
})
export class IngresoItemComponent {
  @Input() ingreso!: Ingreso;

  @Output() confirmar = new EventEmitter<{ id: string, monto: number }>();
  @Output() registrarRecepcion = new EventEmitter<{ id: string, monto: number }>();
  @Output() editar = new EventEmitter<string>();
  @Output() eliminar = new EventEmitter<string>();

  // Estados de los modales
  showConfirmMontoModal = false;
  showRecepcionModal = false;
  showDeleteConfirm = false;

  /**
   * Obtiene el estado del ingreso
   */
  getEstado(): string {
    return calcularEstadoIngreso(this.ingreso);
  }

  /**
   * Verifica si el ingreso está completamente recibido
   */
  isCompletamenteRecibido(): boolean {
    return estaCompletamenteRecibido(this.ingreso);
  }

  /**
   * Verifica si el ingreso está parcialmente recibido
   */
  isParcialmenteRecibido(): boolean {
    return estaParcialmenteRecibido(this.ingreso);
  }

  /**
   * Obtiene la clase CSS según el estado
   */
  getEstadoClass(): string {
    const estado = this.getEstado();
    if (estado === 'Recibido' && this.isCompletamenteRecibido()) {
      return 'estado-recibido-completo';
    } else if (estado === 'Recibido' && this.isParcialmenteRecibido()) {
      return 'estado-recibido-parcial';
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
   * Confirma el monto del ingreso
   */
  onConfirmarMonto(monto: number): void {
    this.confirmar.emit({ id: this.ingreso.id, monto });
    this.showConfirmMontoModal = false;
  }

  /**
   * Abre el modal para registrar recepción
   */
  onRecibirClick(): void {
    this.showRecepcionModal = true;
  }

  /**
   * Registra la recepción del ingreso
   */
  onRegistrarRecepcion(monto: number): void {
    this.registrarRecepcion.emit({ id: this.ingreso.id, monto });
    this.showRecepcionModal = false;
  }

  /**
   * Emite el evento para editar
   */
  onEditarClick(): void {
    this.editar.emit(this.ingreso.id);
  }

  /**
   * Abre el modal de confirmación de eliminación
   */
  onEliminarClick(): void {
    this.showDeleteConfirm = true;
  }

  /**
   * Confirma la eliminación del ingreso
   */
  onConfirmarEliminar(): void {
    this.eliminar.emit(this.ingreso.id);
    this.showDeleteConfirm = false;
  }

  /**
   * Cierra los modales
   */
  onCancelarModal(): void {
    this.showConfirmMontoModal = false;
    this.showRecepcionModal = false;
    this.showDeleteConfirm = false;
  }
}
