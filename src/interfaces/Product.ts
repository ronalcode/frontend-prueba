export interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad: number;
  proveedor?: {
    id: number;
    nombre: string;
  };
}
