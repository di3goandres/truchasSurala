export class Cajas {
  constructor(
    public id: number,
    // tslint:disable-next-line: variable-name
    public id_despacho: number,
    // tslint:disable-next-line: variable-name
    public linea_genetica: string,
    // tslint:disable-next-line: variable-name
    public numero_cajas: number,
    // tslint:disable-next-line: variable-name
    public ovasml: number,

    public tamanio: number,
    // tslint:disable-next-line: variable-name
    public total_lote: number,
    // tslint:disable-next-line: variable-name
    public edad: number,
    // tslint:disable-next-line: variable-name
    public fecha_desove: string,

    public repetir: number

  ) { }
}
