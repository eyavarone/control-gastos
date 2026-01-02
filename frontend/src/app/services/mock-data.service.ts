import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hogar } from '../models/hogar.model';
import { MesCompleto, MesConTotales } from '../models/mes.model';
import { Gasto, GastoCompleto } from '../models/gasto.model';
import { Ingreso } from '../models/ingreso.model';
import { Categoria } from '../models/categoria.model';
import { TipoGastoIngreso } from '../models/estado.model';

/**
 * Servicio que proporciona datos mock para desarrollo
 * Simula llamadas a API con delays realistas
 */
@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  // Datos mock
  private hogares: Hogar[] = [
    {
      id: '1',
      nombre: 'Mi Hogar',
      descripcion: 'Presupuesto familiar principal',
      usuarioPropietarioId: 'user1',
      fechaCreacion: new Date('2024-01-01'),
      fechaUltimaModificacion: new Date('2024-12-01')
    },
    {
      id: '2',
      nombre: 'Presupuesto Personal',
      descripcion: 'Gastos personales',
      usuarioPropietarioId: 'user1',
      fechaCreacion: new Date('2024-06-01'),
      fechaUltimaModificacion: new Date('2024-12-01')
    }
  ];

  private categorias: Categoria[] = [
    { id: '1', nombre: 'Alimentación', color: '#FF6B6B', hogarId: '1' },
    { id: '2', nombre: 'Servicios', color: '#4ECDC4', hogarId: '1' },
    { id: '3', nombre: 'Transporte', color: '#45B7D1', hogarId: '1' },
    { id: '4', nombre: 'Salud', color: '#FFA07A', hogarId: '1' },
    { id: '5', nombre: 'Educación', color: '#98D8C8', hogarId: '1' },
    { id: '6', nombre: 'Entretenimiento', color: '#F7DC6F', hogarId: '1' },
    { id: '7', nombre: 'Hogar', color: '#BB8FCE', hogarId: '1' },
    { id: '8', nombre: 'Tecnología', color: '#85C1E2', hogarId: '1' }
  ];

  private gastos: GastoCompleto[] = [
    {
      id: 'g1',
      concepto: 'Alquiler',
      montoAdeudado: 50000,
      montoPagado: 50000,
      estaConfirmado: true,
      tipo: TipoGastoIngreso.Fijo,
      mesId: 'm1',
      fechaCreacion: new Date('2024-12-01'),
      fechaUltimaModificacion: new Date('2024-12-05'),
      categorias: [this.categorias[1], this.categorias[6]] // Servicios + Hogar
    },
    {
      id: 'g2',
      concepto: 'Luz',
      montoAdeudado: 8000,
      montoPagado: 0,
      estaConfirmado: true,
      tipo: TipoGastoIngreso.Fijo,
      mesId: 'm1',
      fechaCreacion: new Date('2024-12-01'),
      fechaUltimaModificacion: new Date('2024-12-10'),
      categorias: [this.categorias[1]]
    },
    {
      id: 'g3',
      concepto: 'Supermercado',
      montoAdeudado: 25000,
      montoPagado: 15000,
      estaConfirmado: true,
      tipo: TipoGastoIngreso.Variable,
      mesId: 'm1',
      fechaCreacion: new Date('2024-12-01'),
      fechaUltimaModificacion: new Date('2024-12-15'),
      categorias: [this.categorias[0], this.categorias[3], this.categorias[4], this.categorias[5], this.categorias[6]] // 5 categorías
    },
    {
      id: 'g4',
      concepto: 'Internet',
      montoAdeudado: 5000,
      montoPagado: 0,
      estaConfirmado: false,
      tipo: TipoGastoIngreso.Fijo,
      mesId: 'm1',
      fechaCreacion: new Date('2024-12-01'),
      fechaUltimaModificacion: new Date('2024-12-01'),
      categorias: [this.categorias[1], this.categorias[7]] // Servicios + Tecnología
    },
    {
      id: 'g5',
      concepto: 'Combustible',
      montoAdeudado: 12000,
      montoPagado: 6000,
      estaConfirmado: true,
      tipo: TipoGastoIngreso.Variable,
      mesId: 'm1',
      fechaCreacion: new Date('2024-12-01'),
      fechaUltimaModificacion: new Date('2024-12-12'),
      categorias: [this.categorias[2]] // Transporte
    }
  ];

  private ingresos: Ingreso[] = [
    {
      id: 'i1',
      concepto: 'Sueldo',
      montoEsperado: 150000,
      montoRecibido: 150000,
      estaConfirmado: true,
      tipo: TipoGastoIngreso.Fijo,
      mesId: 'm1',
      fechaCreacion: new Date('2024-12-01'),
      fechaUltimaModificacion: new Date('2024-12-05')
    },
    {
      id: 'i2',
      concepto: 'Freelance',
      montoEsperado: 30000,
      montoRecibido: 0,
      estaConfirmado: false,
      tipo: TipoGastoIngreso.Variable,
      mesId: 'm1',
      fechaCreacion: new Date('2024-12-01'),
      fechaUltimaModificacion: new Date('2024-12-01')
    }
  ];

  private meses: MesCompleto[] = [
    {
      id: 'm1',
      año: 2024,
      mes: 12,
      hogarId: '1',
      fechaCreacion: new Date('2024-12-01'),
      fechaUltimaModificacion: new Date('2024-12-15'),
      gastos: this.gastos,
      ingresos: this.ingresos
    }
  ];

  /**
   * Obtiene todos los hogares del usuario
   */
  getHogares(): Observable<Hogar[]> {
    return of([...this.hogares]);
  }

  /**
   * Obtiene un hogar por ID
   */
  getHogarById(id: string): Observable<Hogar | null> {
    const hogar = this.hogares.find(h => h.id === id);
    return of(hogar ? { ...hogar } : null);
  }

  /**
   * Obtiene todos los meses de un hogar
   */
  getMesesPorHogar(hogarId: string): Observable<MesCompleto[]> {
    const meses = this.meses.filter(m => m.hogarId === hogarId);
    return of([...meses]);
  }

  /**
   * Obtiene un mes completo con totalizadores
   */
  getMesCompleto(mesId: string): Observable<MesConTotales | null> {
    const mes = this.meses.find(m => m.id === mesId);
    if (!mes) {
      return of(null);
    }

    const totalizadores = this.calcularTotalizadores(mes);
    const mesConTotales: MesConTotales = {
      ...mes,
      totalizadores
    };

    return of(mesConTotales);
  }

  /**
   * Obtiene todas las categorías
   */
  getCategorias(hogarId?: string): Observable<Categoria[]> {
    let categorias = this.categorias;
    if (hogarId) {
      categorias = categorias.filter(c => !c.hogarId || c.hogarId === hogarId);
    }
    return of([...categorias]);
  }

  /**
   * Calcula los totalizadores de un mes
   */
  private calcularTotalizadores(mes: MesCompleto) {
    const ingresosTotal = {
      esperado: mes.ingresos.reduce((sum, i) => sum + i.montoEsperado, 0),
      recibido: mes.ingresos.reduce((sum, i) => sum + i.montoRecibido, 0)
    };

    const gastosFijos = mes.gastos.filter(g => g.tipo === TipoGastoIngreso.Fijo);
    const gastosVariables = mes.gastos.filter(g => g.tipo === TipoGastoIngreso.Variable);

    const gastosFijosTotal = {
      adeudado: gastosFijos.reduce((sum, g) => sum + g.montoAdeudado, 0),
      pagado: gastosFijos.reduce((sum, g) => sum + g.montoPagado, 0)
    };

    const gastosVariablesTotal = {
      adeudado: gastosVariables.reduce((sum, g) => sum + g.montoAdeudado, 0),
      pagado: gastosVariables.reduce((sum, g) => sum + g.montoPagado, 0)
    };

    return {
      ingresos: ingresosTotal,
      gastosFijos: gastosFijosTotal,
      gastosVariables: gastosVariablesTotal
    };
  }
}



