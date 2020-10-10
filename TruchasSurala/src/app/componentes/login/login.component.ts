import { Component, OnInit } from '@angular/core';
import { User } from '../../models/users';
import { Login } from '../../models/login';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../service/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public title: string;
  public user: Login;
  public status: string;
  public token: string;
  public identity;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute

  ) {
    this.title = 'Identifícate';
    this.user = new Login('', '');
  }

  ngOnInit(): void {
    
    this.logOut();
    this.verificarLogueo();
  }


  async onLogin(formulario) {
    this.status = '';

  await  this.userService.loginUser(this.user).subscribe(
      response => {
        // tslint:disable-next-line: triple-equals
        if (response.status == null) {

          this.status = 'success';
          this.token = response;
          localStorage.setItem('token', this.token);
          this.userService.getToken();
          this.ObtenerdatosUser();
          formulario.reset();
         
        } else {
          this.status = 'error';

        }
      },
      error => {
        this.status = 'error';
      }

    );
    // f

  }


  async ObtenerdatosUser() {
    await this.userService.loginUser(this.user, true).subscribe(
      response => {
        // tslint:disable-next-line: triple-equals

        this.status = 'success';
        this.identity = response;

      
        localStorage.setItem('identity', JSON.stringify(this.identity));
        this.userService.getToken();
        this.router.navigate(['/surala/home']);

      },
      error => {
        this.status = 'error';
      }

    );
    // f

  }

  verificarLogueo(){
    if(this.userService.getIdentity()!=null && this.userService.getToken() != null){
      this.router.navigate(['surala/home']);
      
    }else {
      this.router.navigate(['/surala/login']);
    }
  }
  logOut(): void {
    this.route.params.subscribe(
      params => {
        let logout = +params.sure;
        if (logout === 1) {
          localStorage.removeItem('identity');
          localStorage.removeItem('token');
          this.identity = null;
          this.token = null;
        
          // redireccion a la pagina principal.
          this.router.navigate(['/surala/login']);

        }

      }
    );
  }

}
