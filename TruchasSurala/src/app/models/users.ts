export class User {
  constructor(


  ) {

    this.Fincas = [];
  }
  public id: number;
  public role: string;
  public name: string;
  public surname: string;
  public telefono: string;

  // tslint:disable-next-line: variable-name
  public numero_identificacion: string;
  // tslint:disable-next-line: variable-name
  public tipo_identificacion: string;

  public email: string;
  public password: string;

  public description: string;
  public image: string;

  public Fincas: FincasUsuario[];
}


export class FincasUsuario {
  constructor(

    position: number,
    nombre: string,
    municipio: number,
    NombreMunicipio: string,
    NombreDepartamento: string,
    direccion: string
  ) {

    this.position = position
    this.nombre = nombre
    this.municipio = municipio
    this.NombreMunicipio = NombreMunicipio,
    this.NombreDepartamento = NombreDepartamento,
    this.direccion = direccion

  }

  public position: number;
  public nombre: string;
  public municipio: number;
  public NombreMunicipio: string;
  public NombreDepartamento: string;
  public direccion: string;

}