// Generated by https://quicktype.io

export interface UserNotificacion {
    code:     number;
    status:   string;
    usuarios: Usuario[];
}

export interface Usuario {
    id:                    number;
    name:                  string;
    surname:               string;
    numero_identificacion: string;
    email:                 string;
}
