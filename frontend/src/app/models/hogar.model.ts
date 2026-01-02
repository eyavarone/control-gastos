/**
 * Modelo de Hogar
 */
export interface Hogar {
  id: string;
  nombre: string;
  descripcion?: string;
  usuarioPropietarioId: string;
  fechaCreacion: Date;
  fechaUltimaModificacion: Date;
}

/**
 * Hogar con información del propietario
 */
export interface HogarConPropietario extends Hogar {
  propietario: {
    id: string;
    nombre: string;
    email: string;
  };
}



