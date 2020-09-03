import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user/user.service';


@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  mostrar= false;
  title: string;
  constructor(
    private userService: UserService
  ) {
    this.title = 'Bienvenido a la pagina de Trucha Surala';
  }
  urlImage: string
  ngOnInit(): void {
      this.urlImage = this.userService.getUrlImage('1597775491banner1.png')
      this.mostrar = true;
  }

}
