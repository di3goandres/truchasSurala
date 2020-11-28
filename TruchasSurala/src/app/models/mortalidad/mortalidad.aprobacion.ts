
export class MortalidadAprobacionRequest {
    id_mortalidad:       number;
    aprobado_Troutlodge: number;
    aprobado_Surala:     number;
    Estado:              Status
    Observaciones:       string;
}

export enum Status {
    Pendiente = "Pendiente",
    NoAprobada = "No Aprobada",
    Aprobada = "Aprobada",
}