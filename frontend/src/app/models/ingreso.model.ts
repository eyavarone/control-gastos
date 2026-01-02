import { TipoGastoIngreso } from './estado.model';

/**
 * Modelo de Ingreso
 */
export interface Ingreso {
  id: string;
  concepto: string;
  montoEsperado: number;
  montoRecibido: number;
  estaConfirmado: boolean;
  tipo: TipoGastoIngreso;
  mesId: string;
  fechaCreacion: Date;
  fechaUltimaModificacion: Date;
}

/**
 * Calcula el estado del ingreso basado en sus propiedades
 */
export function calcularEstadoIngreso(ingreso: Ingreso): 'Pendiente' | 'Confirmado' | 'Recibido' {
  if (ingreso.montoRecibido > 0) {
    return 'Recibido';
  }
  if (ingreso.estaConfirmado || ingreso.montoRecibido > 0) {
    return 'Confirmado';
  }
  return 'Pendiente';
}

/**
 * Verifica si el ingreso está completamente recibido
 */
export function estaCompletamenteRecibido(ingreso: Ingreso): boolean {
  return ingreso.montoRecibido > 0 && ingreso.montoRecibido >= ingreso.montoEsperado;
}

/**
 * Verifica si el ingreso está parcialmente recibido
 */
export function estaParcialmenteRecibido(ingreso: Ingreso): boolean {
  return ingreso.montoRecibido > 0 && ingreso.montoRecibido < ingreso.montoEsperado;
}



