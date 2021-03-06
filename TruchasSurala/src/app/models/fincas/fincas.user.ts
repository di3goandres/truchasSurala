export interface FincasUser {
    code:   number;
    status: string;
    fincas: Finca[];
}

export class Finca {
    constructor(){
        this.nombre='';
        this.direccion=''
    }
    id:                      number;
    user_id:                 number;
    nombre:                  string;
    id_municipio:            number;
    direccion:               string;
    imagen:                  string;

    altura_nivel_mar:        number;
    temperatura_centigrados: number;
    created_at:              string;
    updated_at:              string;
}