// Generated by https://quicktype.io

export interface UsuariosFincasResponse {
    code:     number;
    status:   string;
    Usuarios: Usuario[];
}

export interface Usuario {
    id:                    number;
    id_identificacion:     number;
    numero_identificacion: string;
    name:                  string;
    surname:               string;
    role:                  string;
    email:                 string;
    tipo_usuario:          string;

    telefono:              null | string;
    description:           null;
    image:                 null;
    created_at:            string;
    updated_at:            string;
    remeber_token:         null;
}
