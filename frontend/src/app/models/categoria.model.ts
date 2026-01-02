/**
 * Modelo de Categoria
 */
export interface Categoria {
  id: string;
  nombre: string;
  descripcion?: string;
  color?: string; // Color hexadecimal para visualización
  hogarId?: string; // Si es null, es global
}



