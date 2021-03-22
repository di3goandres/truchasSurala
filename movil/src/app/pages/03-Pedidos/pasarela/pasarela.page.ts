import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-pasarela',
  templateUrl: './pasarela.page.html',
  styleUrls: ['./pasarela.page.scss'],
})
export class PasarelaPage implements OnInit ,OnDestroy{

  user:User
  constructor(
    private Service: UserService
  ) { }
  ngOnDestroy(): void {
    console.log('Method not implemented.');
    this.user = null;

  }

  ngOnInit() {
    this.user = this.Service.currenUserValue;
    console.log(this.user)
  }

}
