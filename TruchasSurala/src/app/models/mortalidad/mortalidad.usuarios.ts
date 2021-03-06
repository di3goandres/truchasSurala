// Generated by https://quicktype.io

export interface MortalidadUsuariosRespose {
    status:          string;
    code:            number;
    detalleUsuarios: DetalleMortalidadUsuario[];
}

export interface DetalleMortalidadUsuario {
    id_mortalidad: number;
    id_finca:      number;
    id_despacho:   number;
    nombre:        string;
    finca:         string;
    fecha:         string;
    total:         number;
    cantidad:      number;
    porcentaje:    number;
}
