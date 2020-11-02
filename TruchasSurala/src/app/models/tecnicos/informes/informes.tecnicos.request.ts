import { SaveFile } from '../../pedidos/guardar.pdf.response';
export class InformesTecnicosRequest{
    id: number;
    user_id: number;
    cedula: string;
    finca_id: number;
    fecha: Date;
    observaciones: string;
    informes: SaveFile[]
    
}

