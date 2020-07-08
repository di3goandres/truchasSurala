import { DespachoClass } from './../../../models/despacho';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user/user.service';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {

  minDate: Date;
  maxDate: Date;
  despacho: DespachoClass;
  myDateValue: Date;
  previousDate: Date;
  agregar: boolean;
  status: string;
  title: string;
  constructor(
              private userService: UserService,
              public datepipe: DatePipe,
              private router: Router,
              private route: ActivatedRoute) {
    this.title = 'Creacion de un despacho';
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 8);
    this.maxDate.setDate(this.maxDate.getDate() + 8);
    this.myDateValue = new Date();

  }

  ngOnInit(): void {
    this.despacho = new DespachoClass('', '', '', 1);
    this.agregar = false;
  }

  onRegister(formulario): void {

    this.despacho.fecha = this.datepipe.transform(this.despacho.fecha, 'yyyy-MM-dd');
    this.userService.storeDespacho(this.despacho).subscribe(
      response => {
        console.log(response);
        // tslint:disable-next-line: triple-equals
        if (response.status == 'success') {
          formulario.reset();
          this.router.navigate(['/surala/despacho/', response.despacho.id]);

        } else {
          this.status = 'error';
        }
      },
      error => {
        console.log(error);

        this.status = 'error';

        console.log(error as any);
      }

    );
  }

  onDateChange(newDate: Date): void {
      this.previousDate = new Date(newDate);


  }

  onClickMostrar(){
    this.agregar = !this.agregar;
  }
}
