import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { Gasto, GastoCompleto, TipoGastoIngreso } from '../../../models/gasto.model';
import { Categoria } from '../../../models/categoria.model';

/**
 * Componente de formulario para crear y editar gastos
 */
@Component({
  selector: 'app-gasto-form',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule
  ],
  templateUrl: './gasto-form.html',
  styleUrls: ['./gasto-form.css']
})
export class GastoFormComponent implements OnInit {
  /** Gasto a editar (null para crear uno nuevo) */
  @Input() gasto: GastoCompleto | null = null;

  /** Lista de categorías disponibles */
  @Input() categorias: Categoria[] = [];

  /** Evento emitido al guardar el gasto */
  @Output() guardar = new EventEmitter<Partial<GastoCompleto>>();

  /** Evento emitido al cancelar */
  @Output() cancelar = new EventEmitter<void>();

  // Datos del formulario
  concepto: string = '';
  montoEsperado: number = 0;
  montoPagado: number = 0;
  tipo: TipoGastoIngreso = TipoGastoIngreso.Variable;
  categoriasSeleccionadas: string[] = [];
  fechaVencimiento: string = '';
  notas: string = '';

  // Estado del formulario
  isEditMode: boolean = false;
  errors: { [key: string]: string } = {};

  // Enums para el template
  TipoGasto = TipoGastoIngreso;

  /**
   * Inicializa el componente
   */
  ngOnInit(): void {
    if (this.gasto) {
      this.isEditMode = true;
      this.concepto = this.gasto.concepto;
      this.montoEsperado = this.gasto.montoAdeudado;
      this.montoPagado = this.gasto.montoPagado;
      this.tipo = this.gasto.tipo;
      this.categoriasSeleccionadas = this.gasto.categorias.map((c: Categoria) => c.id);
      this.fechaVencimiento = this.gasto.fechaVencimiento || '';
      this.notas = this.gasto.notas || '';
    } else {
      // Valores por defecto para nuevo gasto
      this.isEditMode = false;
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

    if (this.montoPagado < 0) {
      this.errors['montoPagado'] = 'El monto pagado no puede ser negativo';
    }

    // REGLA DE NEGOCIO: Si el monto pagado es mayor al esperado, 
    // ajustar automáticamente el monto esperado
    if (this.montoPagado > this.montoEsperado) {
      this.montoEsperado = this.montoPagado;
    }

    if (this.categoriasSeleccionadas.length === 0) {
      this.errors['categorias'] = 'Debe seleccionar al menos una categoría';
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

    const categoriasObj = this.categorias.filter(c => 
      this.categoriasSeleccionadas.includes(c.id)
    );

    const gastoData: Partial<GastoCompleto> = {
      concepto: this.concepto.trim(),
      montoAdeudado: this.montoEsperado,
      montoPagado: this.montoPagado,
      tipo: this.tipo,
      categorias: categoriasObj,
      fechaVencimiento: this.fechaVencimiento,
      notas: this.notas.trim()
    };

    // Si estamos editando, incluir el ID
    if (this.isEditMode && this.gasto) {
      gastoData.id = this.gasto.id;
    }

    this.guardar.emit(gastoData);
  }

  /**
   * Maneja la cancelación del formulario
   */
  onCancelar(): void {
    this.cancelar.emit();
  }

  /**
   * Valida el monto pagado en tiempo real
   * Si el monto pagado es mayor al esperado, ajusta automáticamente el esperado
   */
  onMontoPagadoChange(): void {
    if (this.montoPagado > 0 && this.montoPagado > this.montoEsperado) {
      this.montoEsperado = this.montoPagado;
    }
  }

  /**
   * Maneja el cambio de categorías seleccionadas
   */
  onCategoriasChange(): void {
    // Limpiar error de categorías si ahora hay al menos una seleccionada
    if (this.categoriasSeleccionadas.length > 0 && this.errors['categorias']) {
      delete this.errors['categorias'];
    }
  }
}

