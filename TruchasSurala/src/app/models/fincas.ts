export interface UserFinca {
  numeroIdentificacion: string;
  nombre: string;
  id: number;
}

export interface FincaRootObject {
  code: number;
  status: string;
  userFincas: UserFinca[];
}
