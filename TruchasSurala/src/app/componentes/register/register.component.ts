import { Component, OnInit } from '@angular/core';
import { User } from '../../models/users';
import { UserService } from '../../service/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  user: User;
  public title: string;
  public status: string;
  public mail: boolean;
  public password: boolean;
  public identificacion: boolean;

  public errors: any[];


  constructor(private userService: UserService) {
    this.password = false;
    this.title = 'Registro';
    this.user = new User(
      1,
      'usuario', // role
      '', // name
      '', // surname
      '', // numeroiden
      '', // ipoiden
      '', // email
      '', // password
      '', // description
      ''); // image

  }

  ngOnInit(): void {
    //  console.log( this.userService.test());
    this.consultarDatosDepartamentos();
  }

  consultarDatosDepartamentos()
  {
    this.userService.getDatosDepartamentos().subscribe(
      reponse => 
      {
        console.log(reponse)
      },
      error => {
        console.log(error);
      }
    )
  }
  onRegister(formulario): void {


    this.userService.registerUser(this.user).subscribe(
      response => {

        // tslint:disable-next-line: triple-equals
        if (response.status == 'success') {
          formulario.reset();
          this.status = response.status;
          this.mail = false;
          this.identificacion = false;


        } else {
          this.status = 'error';
          if (response.errors.email != null) {
            this.mail = true;
          }
          if (response.errors.numero_identificacion != null) {
            this.identificacion = true;
          }

        }
      },
      error => {
        this.status = 'error';

        console.log(error as any);
      }

    );
    // f

  }

}
