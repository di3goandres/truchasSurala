export class Medicamentos{
    public tipo:        string;  
    public nombre:      string;
    public descripcion?: Descripcion[];
    public cantidad?:    string;
    public fotografia:  string;
    public compuesto?:   Composicion[];

}

export class Descripcion{
    public titulo: string;
    public descripcion: string;
    public items?: Composicion[];

}

export class Composicion{
    public descripcion: string;

}