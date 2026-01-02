import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MockDataService } from '../../../services/mock-data.service';
import { MesConTotales } from '../../../models/mes.model';
import { Gasto, GastoCompleto } from '../../../models/gasto.model';
import { Ingreso } from '../../../models/ingreso.model';
import { Categoria } from '../../../models/categoria.model';
import { TotalizadoresComponent } from '../../../shared/components/totalizadores/totalizadores';
import { GastoItemComponent } from '../../../shared/components/gasto-item/gasto-item';
import { IngresoItemComponent } from '../../../shared/components/ingreso-item/ingreso-item';
import { GastoFormComponent } from '../../../shared/components/gasto-form/gasto-form';
import { IngresoFormComponent } from '../../../shared/components/ingreso-form/ingreso-form';

/**
 * Componente para visualizar un mes con sus gastos e ingresos
 */
@Component({
  selector: 'app-mes-view',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    RouterModule, 
    TotalizadoresComponent,
    GastoItemComponent,
    IngresoItemComponent,
    GastoFormComponent,
    IngresoFormComponent
  ],
  templateUrl: './mes-view.html',
  styleUrl: './mes-view.css'
})
export class MesViewComponent implements OnInit {
  mes: MesConTotales | null = null;
  loading = false;
  
  // Arrays originales
  private allGastosFijos: GastoCompleto[] = [];
  private allGastosVariables: GastoCompleto[] = [];
  private allIngresosFijos: Ingreso[] = [];
  private allIngresosVariables: Ingreso[] = [];
  
  // Arrays filtrados para mostrar
  gastosFijos: GastoCompleto[] = [];
  gastosVariables: GastoCompleto[] = [];
  ingresosFijos: Ingreso[] = [];
  ingresosVariables: Ingreso[] = [];

  // Filtros de búsqueda
  searchGastos: string = '';
  searchIngresos: string = '';

  // Control de formularios
  showGastoForm: boolean = false;
  showIngresoForm: boolean = false;
  gastoEnEdicion: GastoCompleto | null = null;
  ingresoEnEdicion: Ingreso | null = null;

  // Categorías disponibles
  categorias: Categoria[] = [];

  constructor(
    private route: ActivatedRoute,
    private mockDataService: MockDataService
  ) {}

  ngOnInit(): void {
    // Cargar categorías disponibles
    this.mockDataService.getCategorias().subscribe(categorias => {
      this.categorias = categorias;
    });

    this.route.params.subscribe(params => {
      const mesId = params['mesId'];
      if (mesId) {
        this.cargarMes(mesId);
      }
    });
  }

  /**
   * Carga el mes con sus gastos e ingresos
   */
  cargarMes(mesId: string): void {
    this.loading = true;
    this.mockDataService.getMesCompleto(mesId).subscribe({
      next: (mes) => {
        this.mes = mes;
        if (mes) {
          this.organizarDatos(mes);
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar mes:', error);
        this.loading = false;
      }
    });
  }

  /**
   * Organiza los gastos e ingresos por tipo
   */
  private organizarDatos(mes: MesConTotales): void {
    this.allGastosFijos = mes.gastos.filter(g => g.tipo === 'Fijo') as GastoCompleto[];
    this.allGastosVariables = mes.gastos.filter(g => g.tipo === 'Variable') as GastoCompleto[];
    this.allIngresosFijos = mes.ingresos.filter(i => i.tipo === 'Fijo');
    this.allIngresosVariables = mes.ingresos.filter(i => i.tipo === 'Variable');
    
    // Aplicar filtros iniciales
    this.aplicarFiltros();
  }

  /**
   * Filtra los gastos según el texto de búsqueda
   */
  onSearchGastosChange(): void {
    this.aplicarFiltros();
  }

  /**
   * Filtra los ingresos según el texto de búsqueda
   */
  onSearchIngresosChange(): void {
    this.aplicarFiltros();
  }

  /**
   * Aplica los filtros de búsqueda a gastos e ingresos
   */
  private aplicarFiltros(): void {
    // Filtrar gastos
    const searchGastosLower = this.searchGastos.toLowerCase().trim();
    if (searchGastosLower) {
      this.gastosFijos = this.allGastosFijos.filter(g => this.filtrarGasto(g, searchGastosLower));
      this.gastosVariables = this.allGastosVariables.filter(g => this.filtrarGasto(g, searchGastosLower));
    } else {
      this.gastosFijos = [...this.allGastosFijos];
      this.gastosVariables = [...this.allGastosVariables];
    }

    // Filtrar ingresos
    const searchIngresosLower = this.searchIngresos.toLowerCase().trim();
    if (searchIngresosLower) {
      this.ingresosFijos = this.allIngresosFijos.filter(i => this.filtrarIngreso(i, searchIngresosLower));
      this.ingresosVariables = this.allIngresosVariables.filter(i => this.filtrarIngreso(i, searchIngresosLower));
    } else {
      this.ingresosFijos = [...this.allIngresosFijos];
      this.ingresosVariables = [...this.allIngresosVariables];
    }
  }

  /**
   * Verifica si un gasto coincide con el filtro de búsqueda
   */
  private filtrarGasto(gasto: GastoCompleto, searchText: string): boolean {
    // Buscar en concepto
    if (gasto.concepto.toLowerCase().includes(searchText)) {
      return true;
    }

    // Buscar en montos
    if (gasto.montoAdeudado.toString().includes(searchText) || 
        gasto.montoPagado.toString().includes(searchText)) {
      return true;
    }

    // Buscar en categorías
    if (gasto.categorias && gasto.categorias.some(c => c.nombre.toLowerCase().includes(searchText))) {
      return true;
    }

    return false;
  }

  /**
   * Verifica si un ingreso coincide con el filtro de búsqueda
   */
  private filtrarIngreso(ingreso: Ingreso, searchText: string): boolean {
    // Buscar en concepto
    if (ingreso.concepto.toLowerCase().includes(searchText)) {
      return true;
    }

    // Buscar en montos
    if (ingreso.montoEsperado.toString().includes(searchText) || 
        ingreso.montoRecibido.toString().includes(searchText)) {
      return true;
    }

    return false;
  }

  /**
   * Retorna el nombre del mes
   */
  getNombreMes(): string {
    if (!this.mes) return '';
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                   'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return `${meses[this.mes.mes - 1]} ${this.mes.año}`;
  }

  // ===== Acciones de Gastos =====

  /**
   * Confirma el monto de un gasto
   */
  onConfirmarGasto(data: { id: string, monto: number }): void {
    console.log('Confirmar gasto:', data);
    // TODO: Implementar lógica de confirmación con el servicio
    // Por ahora solo mostramos en consola
    alert(`Gasto confirmado: $${data.monto}`);
  }

  /**
   * Registra el pago de un gasto
   */
  onRegistrarPagoGasto(data: { id: string, monto: number }): void {
    console.log('Registrar pago gasto:', data);
    // TODO: Implementar lógica de pago con el servicio
    alert(`Pago registrado: $${data.monto}`);
  }

  /**
   * Edita un gasto
   */
  onEditarGasto(id: string): void {
    console.log('Editar gasto:', id);
    
    // Buscar el gasto en todos los arrays
    const gasto = [...this.allGastosFijos, ...this.allGastosVariables]
      .find(g => g.id === id);
    
    if (gasto) {
      this.gastoEnEdicion = gasto;
      this.showGastoForm = true;
    }
  }

  /**
   * Elimina un gasto
   */
  onEliminarGasto(id: string): void {
    console.log('Eliminar gasto:', id);
    // TODO: Implementar lógica de eliminación con el servicio
    alert(`Gasto eliminado: ${id}`);
  }

  // ===== Acciones de Ingresos =====

  /**
   * Confirma el monto de un ingreso
   */
  onConfirmarIngreso(data: { id: string, monto: number }): void {
    console.log('Confirmar ingreso:', data);
    // TODO: Implementar lógica de confirmación con el servicio
    alert(`Ingreso confirmado: $${data.monto}`);
  }

  /**
   * Registra la recepción de un ingreso
   */
  onRegistrarRecepcionIngreso(data: { id: string, monto: number }): void {
    console.log('Registrar recepción ingreso:', data);
    // TODO: Implementar lógica de recepción con el servicio
    alert(`Recepción registrada: $${data.monto}`);
  }

  /**
   * Edita un ingreso
   */
  onEditarIngreso(id: string): void {
    console.log('Editar ingreso:', id);
    
    // Buscar el ingreso en todos los arrays
    const ingreso = [...this.allIngresosFijos, ...this.allIngresosVariables]
      .find(i => i.id === id);
    
    if (ingreso) {
      this.ingresoEnEdicion = ingreso;
      this.showIngresoForm = true;
    }
  }

  /**
   * Elimina un ingreso
   */
  onEliminarIngreso(id: string): void {
    console.log('Eliminar ingreso:', id);
    // TODO: Implementar lógica de eliminación con el servicio
    alert(`Ingreso eliminado: ${id}`);
  }

  // ===== Métodos de Formularios =====

  /**
   * Abre el formulario para crear un nuevo gasto
   */
  onNuevoGasto(): void {
    this.gastoEnEdicion = null;
    this.showGastoForm = true;
  }

  /**
   * Abre el formulario para crear un nuevo ingreso
   */
  onNuevoIngreso(): void {
    this.ingresoEnEdicion = null;
    this.showIngresoForm = true;
  }

  /**
   * Guarda un gasto (crear o editar)
   */
  onGuardarGasto(gastoData: Partial<GastoCompleto>): void {
    console.log('Guardar gasto:', gastoData);
    
    if (gastoData.id) {
      // Editar gasto existente
      // TODO: Implementar con servicio real
      alert(`Gasto editado: ${gastoData.concepto}`);
    } else {
      // Crear nuevo gasto
      // TODO: Implementar con servicio real
      alert(`Gasto creado: ${gastoData.concepto}`);
    }
    
    this.showGastoForm = false;
    this.gastoEnEdicion = null;
    
    // Recargar datos
    if (this.mes) {
      this.cargarMes(this.mes.id);
    }
  }

  /**
   * Guarda un ingreso (crear o editar)
   */
  onGuardarIngreso(ingresoData: Partial<Ingreso>): void {
    console.log('Guardar ingreso:', ingresoData);
    
    if (ingresoData.id) {
      // Editar ingreso existente
      // TODO: Implementar con servicio real
      alert(`Ingreso editado: ${ingresoData.concepto}`);
    } else {
      // Crear nuevo ingreso
      // TODO: Implementar con servicio real
      alert(`Ingreso creado: ${ingresoData.concepto}`);
    }
    
    this.showIngresoForm = false;
    this.ingresoEnEdicion = null;
    
    // Recargar datos
    if (this.mes) {
      this.cargarMes(this.mes.id);
    }
  }

  /**
   * Cancela el formulario de gasto
   */
  onCancelarGastoForm(): void {
    this.showGastoForm = false;
    this.gastoEnEdicion = null;
  }

  /**
   * Cancela el formulario de ingreso
   */
  onCancelarIngresoForm(): void {
    this.showIngresoForm = false;
    this.ingresoEnEdicion = null;
  }
}
