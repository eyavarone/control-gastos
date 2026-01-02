import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Componente de diálogo de confirmación genérico
 * Se puede usar para confirmar eliminaciones, acciones importantes, etc.
 */
@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.css'
})
export class ConfirmDialogComponent {
  @Input() title: string = '¿Confirmar acción?';
  @Input() message: string = '¿Estás seguro de que deseas continuar?';
  @Input() confirmText: string = 'Confirmar';
  @Input() cancelText: string = 'Cancelar';
  @Input() confirmButtonClass: string = 'btn-primary';
  @Input() isVisible: boolean = false;

  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  /**
   * Emite el evento de confirmación
   */
  onConfirm(): void {
    this.confirmed.emit();
  }

  /**
   * Emite el evento de cancelación
   */
  onCancel(): void {
    this.cancelled.emit();
  }
}

