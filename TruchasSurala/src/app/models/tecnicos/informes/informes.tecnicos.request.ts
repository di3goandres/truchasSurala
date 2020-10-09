import { SaveFile } from '../../pedidos/guardar.pdf.response';
export class InformesTecnicosRequest{
    
    cedula: string;
    finca_id: number;
    fecha: Date;
    observaciones: string;
    informes: SaveFile[]
    
}

