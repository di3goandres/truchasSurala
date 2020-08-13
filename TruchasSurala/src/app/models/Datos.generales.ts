
export interface GeneralesRoot {
    code:          number;
    status:        string;
    departamentos: Departamento[];
    municipios:    Municipio[];
}

export interface Departamento {
    id_departamento: number;
    departamento:    string;
}

export interface Municipio {
    cod_dane:              string;
    cod_dane_departamento: number;
    municipio:             string;
}
