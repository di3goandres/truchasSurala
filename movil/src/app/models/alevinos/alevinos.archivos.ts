
export interface AlevinosArchivosResponse {
    code:             number;
    status:           string;
    archivosAlevinos: ArchivosAlevinos[];
}

export interface ArchivosAlevinos {
    id:          number;
    tipo:        string;
    descripcion: string;
    created_at:  string;
    updated_at:  string;
    estado:      boolean;
    id_archivo?: number;
    nombre?:     string;
}
