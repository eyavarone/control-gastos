import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * Componente modal para confirmar o registrar montos
 * Se usa tanto para confirmar gastos/ingresos como para registrar pagos/recepciones
 */
@Component({
  selector: 'app-monto-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './monto-modal.html',
  styleUrl: './monto-modal.css'
})
export class MontoModalComponent implements OnInit {
  @Input() title: string = 'Ingresar Monto';
  @Input() montoLabel: string = 'Monto';
  @Input() montoActual: number = 0;
  @Input() montoEsperado?: number;
  @Input() concepto: string = '';
  @Input() confirmText: string = 'Confirmar';
  @Input() isVisible: boolean = false;
  @Input() isConfirmMode: boolean = false; // true = confirmar monto, false = registrar pago/recepción

  @Output() confirmed = new EventEmitter<number>();
  @Output() cancelled = new EventEmitter<void>();

  monto: number = 0;
  errorMessage: string = '';

  ngOnInit(): void {
    // Si es modo confirmación, iniciamos con el monto actual
    // Si es modo pago, iniciamos con el monto esperado/adeudado
    this.monto = this.isConfirmMode ? this.montoActual : (this.montoEsperado || this.montoActual);
  }

  /**
   * Valida que el monto sea válido según el modo
   */
  validateMonto(): boolean {
    this.errorMessage = '';

    if (this.monto <= 0) {
      this.errorMessage = 'El monto debe ser mayor a 0';
      return false;
    }

    // Si es modo pago/recepción, el monto no puede ser menor al ya pagado/recibido
    if (!this.isConfirmMode && this.montoActual > 0 && this.monto < this.montoActual) {
      this.errorMessage = 'El monto no puede ser menor al monto ya registrado';
      return false;
    }

    // Si es modo pago/recepción, validar que no exceda el monto esperado/adeudado
    if (!this.isConfirmMode && this.montoEsperado && this.monto > this.montoEsperado) {
      this.errorMessage = 'El monto no puede ser mayor al monto adeudado/esperado';
      return false;
    }

    return true;
  }

  /**
   * Emite el evento de confirmación con el monto
   */
  onConfirm(): void {
    if (this.validateMonto()) {
      this.confirmed.emit(this.monto);
      this.resetForm();
    }
  }

  /**
   * Emite el evento de cancelación
   */
  onCancel(): void {
    this.cancelled.emit();
    this.resetForm();
  }

  /**
   * Resetea el formulario
   */
  private resetForm(): void {
    this.monto = this.isConfirmMode ? this.montoActual : (this.montoEsperado || this.montoActual);
    this.errorMessage = '';
  }

  /**
   * Formatea el monto como moneda
   */
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(amount);
  }
}

