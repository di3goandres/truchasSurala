export class Cajas {
  constructor(
    public id: number,
    // tslint:disable-next-line: variable-name
    public id_despacho: number,
    // tslint:disable-next-line: variable-name
    public linea_genetica: string,
    // tslint:disable-next-line: variable-name
    public numero_bandejas: string,
    // tslint:disable-next-line: variable-name
    public ovas_ml: string,

    public tamanio: number,
    // tslint:disable-next-line: variable-name
    public total_caja: number,
    // tslint:disable-next-line: variable-name
    public edad_tcu: number,
    // tslint:disable-next-line: variable-name
    public fecha_desove: number

  ) { }
}
