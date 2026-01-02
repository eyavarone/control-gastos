import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Ingreso, TipoGastoIngreso } from '../../../models/ingreso.model';

/**
 * Componente de formulario para crear y editar ingresos
 */
@Component({
  selector: 'app-ingreso-form',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './ingreso-form.html',
  styleUrls: ['./ingreso-form.css']
})
export class IngresoFormComponent implements OnInit {
  /** Ingreso a editar (null para crear uno nuevo) */
  @Input() ingreso: Ingreso | null = null;

  /** Evento emitido al guardar el ingreso */
  @Output() guardar = new EventEmitter<Partial<Ingreso>>();

  /** Evento emitido al cancelar */
  @Output() cancelar = new EventEmitter<void>();

  // Datos del formulario
  concepto: string = '';
  montoEsperado: number = 0;
  montoRecibido: number = 0;
  tipo: TipoGastoIngreso = TipoGastoIngreso.Variable;
  fechaEsperada: string = '';
  notas: string = '';

  // Estado del formulario
  isEditMode: boolean = false;
  errors: { [key: string]: string } = {};

  // Enums para el template
  TipoIngreso = TipoGastoIngreso;

  /**
   * Inicializa el componente
   */
  ngOnInit(): void {
    if (this.ingreso) {
      this.isEditMode = true;
      this.concepto = this.ingreso.concepto;
      this.montoEsperado = this.ingreso.montoEsperado;
      this.montoRecibido = this.ingreso.montoRecibido;
      this.tipo = this.ingreso.tipo;
      this.fechaEsperada = this.ingreso.fechaEsperada || '';
      this.notas = this.ingreso.notas || '';
    } else {
      // Valores por defecto para nuevo ingreso
      this.isEditMode = false;
      // Fecha esperada por defecto: inicio de mes actual
      const hoy = new Date();
      const primerDiaMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
      this.fechaEsperada = primerDiaMes.toISOString().split('T')[0];
    }
  }

  /**
   * Valida el formulario
   */
  private validarFormulario(): boolean {
    this.errors = {};

    if (!this.concepto || this.concepto.trim().length === 0) {
      this.errors['concepto'] = 'El concepto es requerido';
    }

    if (this.montoEsperado <= 0) {
      this.errors['montoEsperado'] = 'El monto esperado debe ser mayor a 0';
    }

    if (this.montoRecibido < 0) {
      this.errors['montoRecibido'] = 'El monto recibido no puede ser negativo';
    }

    // REGLA DE NEGOCIO: Si el monto recibido es mayor al esperado,
    // ajustar automáticamente el monto esperado
    if (this.montoRecibido > this.montoEsperado) {
      this.montoEsperado = this.montoRecibido;
    }

    return Object.keys(this.errors).length === 0;
  }

  /**
   * Maneja el envío del formulario
   */
  onSubmit(): void {
    if (!this.validarFormulario()) {
      return;
    }

    const ingresoData: Partial<Ingreso> = {
      concepto: this.concepto.trim(),
      montoEsperado: this.montoEsperado,
      montoRecibido: this.montoRecibido,
      tipo: this.tipo,
      fechaEsperada: this.fechaEsperada,
      notas: this.notas.trim()
    };

    // Si estamos editando, incluir el ID
    if (this.isEditMode && this.ingreso) {
      ingresoData.id = this.ingreso.id;
    }

    this.guardar.emit(ingresoData);
  }

  /**
   * Maneja la cancelación del formulario
   */
  onCancelar(): void {
    this.cancelar.emit();
  }

  /**
   * Valida el monto recibido en tiempo real
   * Si el monto recibido es mayor al esperado, ajusta automáticamente el esperado
   */
  onMontoRecibidoChange(): void {
    if (this.montoRecibido > 0 && this.montoRecibido > this.montoEsperado) {
      this.montoEsperado = this.montoRecibido;
    }
  }
}

