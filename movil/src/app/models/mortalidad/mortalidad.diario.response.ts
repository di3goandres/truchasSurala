import { Pedido } from '../pedidos/pedidos.response';
// Generated by https://quicktype.io

export interface MortalidadDiarioResponse {
    status: string;
    code:   number;
    diario: Diario[];
    pedido: Pedido;
}

export class Diario {
    id:            number;
    id_mortalidad: number;
    dia:           number;
    cantidad:      number;
    desactivar:    boolean; 
    created_at:    string;
    updated_at:    string;
}