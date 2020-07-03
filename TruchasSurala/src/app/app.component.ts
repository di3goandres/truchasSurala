import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './service/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]

})
export class AppComponent implements OnInit, DoCheck{
  public identity;
  public token;
  title = 'Truchas Surala';
  constructor(public userService: UserService){
   this.loadUser();
  }
  ngDoCheck(): void {
    this.loadUser();

  }
  ngOnInit(): void {

  }

  loadUser(): void{
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
  }
}
