export interface PedidoUnico {
  id: number;
  id_despacho: number;
  id_finca: number;
  pedido: number;
  porcentaje: number;
  adicional: number;
  reposicion: number;
  total: number;
  genero_trazabilidad: number;
  created_at: string;
  updated_at: string;
}

export interface PediRootObject {
  code: number;
  status: string;
  pedido: PedidoUnico;
}
