// Generated by https://quicktype.io
export interface FincaUserResponse {
  code: number;
  status: string;
  userFincas: UserFinca[];
}

export class UserFinca {
    constructor(){
        this.id = 0
        this.nombre = ""
        this.nombreFinca = ""
        this.Ubicacion = ""

    }
  numeroIdentificacion: string;
  nombre: string;
  id: number;
  nombreFinca: string;
  Ubicacion: string;
  propia: boolean;
}