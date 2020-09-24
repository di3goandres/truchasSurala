import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-perfilusuario',
  templateUrl: './perfilusuario.page.html',
  styleUrls: ['./perfilusuario.page.scss'],
})
export class PerfilusuarioPage implements OnInit {

  user: User;
  constructor(
    private Service: UserService
  ) { }

  ngOnInit() {
   this.user = this.Service.getIdentity();
   console.log(this.user)
  }

}
