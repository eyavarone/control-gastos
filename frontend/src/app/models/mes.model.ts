import { Hogar } from './hogar.model';
import { Gasto } from './gasto.model';
import { Ingreso } from './ingreso.model';

/**
 * Modelo de Mes
 */
export interface Mes {
  id: string;
  año: number;
  mes: number; // 1-12
  hogarId: string;
  fechaCreacion: Date;
  fechaUltimaModificacion: Date;
}

/**
 * Mes con sus relaciones cargadas
 */
export interface MesCompleto extends Mes {
  hogar?: Hogar;
  gastos: Gasto[];
  ingresos: Ingreso[];
}

/**
 * Mes con totalizadores calculados
 */
export interface MesConTotales extends MesCompleto {
  totalizadores: {
    ingresos: {
      esperado: number;
      recibido: number;
    };
    gastosFijos: {
      adeudado: number;
      pagado: number;
    };
    gastosVariables: {
      adeudado: number;
      pagado: number;
    };
  };
}



