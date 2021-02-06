
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
    id: number;
    cod_dane:              string;
    cod_dane_departamento: number;
    municipio:             string;
}



export class Select {
    value: string;
    viewValue: string;
  }
