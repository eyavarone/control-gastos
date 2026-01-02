import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Componente para mostrar los totalizadores del mes
 */
@Component({
  selector: 'app-totalizadores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './totalizadores.html',
  styleUrl: './totalizadores.css'
})
export class TotalizadoresComponent {
  @Input() totalizadores: any;

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
   * Calcula el total de gastos (fijos + variables)
   */
  getTotalGastosAdeudado(): number {
    if (!this.totalizadores) return 0;
    return this.totalizadores.gastosFijos.adeudado + this.totalizadores.gastosVariables.adeudado;
  }

  getTotalGastosPagado(): number {
    if (!this.totalizadores) return 0;
    return this.totalizadores.gastosFijos.pagado + this.totalizadores.gastosVariables.pagado;
  }

  /**
   * Calcula el balance (ingresos - gastos)
   */
  getBalanceEsperado(): number {
    if (!this.totalizadores) return 0;
    return this.totalizadores.ingresos.esperado - this.getTotalGastosAdeudado();
  }

  getBalanceReal(): number {
    if (!this.totalizadores) return 0;
    return this.totalizadores.ingresos.recibido - this.getTotalGastosPagado();
  }
}
