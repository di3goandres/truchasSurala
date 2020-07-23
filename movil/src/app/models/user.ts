
export class User {
    constructor(
      public id: number,
      public role: string,
      public name: string,
      public surname: string,
      // tslint:disable-next-line: variable-name
      public numero_identificacion: string,
      // tslint:disable-next-line: variable-name
      public tipo_identificacion: string,
  
      public email: string,
      public password: string,
  
      public description: string,
      public image: string
  
    ) { }
  }
  