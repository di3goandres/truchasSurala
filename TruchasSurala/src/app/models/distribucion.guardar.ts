export class BandejaGuardar {
  constructor(  // tslint:disable-next-line: variable-name
    public id_bandeja_lote: number,
    public cantidad: number,
    // tslint:disable-next-line: variable-name
    public id_lote: number,

    public numerobandeja: string,
    public numerocaja: string


  ) { }
}

export class DistribucionGuardar {
  constructor(
    // tslint:disable-next-line: variable-name
    public id_pedido: number,
    // tslint:disable-next-line: variable-name
    public id_despacho: number,
    // tslint:disable-next-line: variable-name
    public id_finca: number,
    // tslint:disable-next-line: variable-name
    public total_ovas_enviadas: number,
    // tslint:disable-next-line: variable-name
    public bandejas: BandejaGuardar[]
  ) {

    this.por_maximo = false;
    this.numero_bandejas_por_trazabilidad = 5;

  }
  public por_maximo: boolean;

  public numero_bandejas_por_trazabilidad: number;

}
