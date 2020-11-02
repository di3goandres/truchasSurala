export class Login {
    constructor(
  
      public email: string,
      public password: string,
  
    ) { }
  }
  

  export class ResetPassword{
    public old_password: string;
    public password_confirm: string;

    public password: string;

  }