// Generated by https://quicktype.io

export interface ProgramacionAlevinosResponse {
    code:         number;
    status:       string;
    programacion: ProgramacionAlevinos[];
}

export class ProgramacionAlevinos {
    constructor()
    {
        this.id = 0;
    }
    id:            number;
    fecha_salida:  string;
    numero_semana: number;
    dia:           string;
    despachado:    boolean;
    created_at:    string;
    updated_at:    string;
    estado:        string;
}
