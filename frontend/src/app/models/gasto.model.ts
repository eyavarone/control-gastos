import { TipoGastoIngreso } from './estado.model';
import { Categoria } from './categoria.model';

// Re-exportar TipoGastoIngreso para facilitar su uso
export { TipoGastoIngreso };

/**
 * Modelo de Gasto
 */
export interface Gasto {
  id: string;
  concepto: string;
  montoAdeudado: number;
  montoPagado: number;
  estaConfirmado: boolean;
  tipo: TipoGastoIngreso;
  mesId: string;
  fechaCreacion: Date;
  fechaUltimaModificacion: Date;
  fechaVencimiento?: string;
  notas?: string;
}

/**
 * Gasto con sus categorías cargadas
 */
export interface GastoCompleto extends Gasto {
  categorias: Categoria[];
}

/**
 * Calcula el estado del gasto basado en sus propiedades
 */
export function calcularEstadoGasto(gasto: Gasto): 'Pendiente' | 'Confirmado' | 'Pagado' {
  if (gasto.montoPagado > 0) {
    return 'Pagado';
  }
  if (gasto.estaConfirmado || gasto.montoPagado > 0) {
    return 'Confirmado';
  }
  return 'Pendiente';
}

/**
 * Verifica si el gasto está completamente pagado
 */
export function estaCompletamentePagado(gasto: Gasto): boolean {
  return gasto.montoPagado > 0 && gasto.montoPagado >= gasto.montoAdeudado;
}

/**
 * Verifica si el gasto está parcialmente pagado
 */
export function estaParcialmentePagado(gasto: Gasto): boolean {
  return gasto.montoPagado > 0 && gasto.montoPagado < gasto.montoAdeudado;
}



