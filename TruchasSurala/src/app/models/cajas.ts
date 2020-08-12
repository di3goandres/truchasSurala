export class Cajas {
  constructor(
   
    despacho: number
  ) { 

    this.id_despacho = despacho
    this.total_lote = 0;
    this.numero_cajas =5;
    this.repetir = 1;
    this.ovasml = 0;
    this.tamanio = 0;
  }

  public id: number;
  // tslint:disable-next-line: variable-name
  public id_despacho: number;
  // tslint:disable-next-line: variable-name
  public linea_genetica: string;
  public numero_lote: string;

  // tslint:disable-next-line: variable-name
  public numero_cajas: number;
  // tslint:disable-next-line: variable-name
  public ovasml: number;

  public tamanio: number;
  // tslint:disable-next-line: variable-name
  public total_lote: number;
  // tslint:disable-next-line: variable-name
  public edad: number;
  // tslint:disable-next-line: variable-name
  public fecha_desove: string;

  public repetir: number;
}
