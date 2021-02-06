export class Login {
  constructor(

    public email: string,
    public password: string,

  ) { }
}

export class UserLogin{
  constructor(){
    this.rol ="";
  }
  public email: string;
  public name: string;
  public surname: string;
  public rol : string;
}
