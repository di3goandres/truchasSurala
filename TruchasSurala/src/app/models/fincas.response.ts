// Generated by https://quicktype.io

export interface FincasResponse {
    code:   number;
    status: string;
    fincas: Finca[];
}

export interface Finca {
    id:                      number;
    user_id:                 number;
    nombre:                  string;
    id_municipio:            number;
    municipio:               string;
    departamento:            string;
    direccion:               string;
    altura_nivel_mar:        number;
    temperatura_centigrados: number;
    created_at:              string;
    updated_at:              string;
}