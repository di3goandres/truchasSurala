import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DespachoClass } from 'src/app/models/despacho';
import { UserService } from 'src/app/service/user/user.service';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { RegistroExitosoComponent } from '../../01-Comunes/registro-exitoso/registro-exitoso.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-creardespacho',
  templateUrl: './creardespacho.component.html',
  styleUrls: ['./creardespacho.component.css']
})
export class CreardespachoComponent implements OnInit {

 
  firstFormGroup: FormGroup;
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
              private modalService: NgbModal,
              private _formBuilder: FormBuilder,
            
              ) {
    this.title = 'Creación de un despacho';
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 8);
    this.maxDate.setDate(this.maxDate.getDate() + 8);
    this.myDateValue = new Date();

  }

  ngOnInit(): void {

    this.firstFormGroup =this._formBuilder.group({
      FechaEntrada: ['', Validators.required],
      FechaSalida: ['', Validators.required],
      NumeroFactura: ['', Validators.required],
      NumeroDeOvas: ['', Validators.required],
      NumeroDeOvasRegalo: ['', Validators.required],

      NumeroDeOvasAdicionales: ['', Validators.required],
      reposicion: ['', Validators.required],


      Porcentaje: ['', [Validators.min(0), Validators.max(100)]],
    });
    this.despacho = new DespachoClass();
    this.agregar = false;
  }
  calcularOvas(){

    let ovas: number = +this.despacho.numero_ovas;
    this.despacho.ovas_adicionales = (ovas * this.despacho.porcentaje)/100;
    this.despacho.ovas_adicionales =Math.round(this.despacho.ovas_adicionales);

  }


  onRegister(formulario): void {


     this.despacho.fecha = this.datepipe.transform(this.despacho.fechaEntrada, 'yyyy-MM-dd');
     this.despacho.fechaSalida = this.datepipe.transform(this.despacho.fechaEntrega, 'yyyy-MM-dd');

  
   
    this.userService.storeDespacho(this.despacho).subscribe(
      response => {
      

        // tslint:disable-next-line: triple-equals
        if (response.status == 'success') {
          formulario.reset();
          this.openExitoso();
          this.router.navigate(['/surala/despacho/', response.despacho.id]);

        } else {
          this.status = 'error';
        }
      },
      error => {
       
        this.status = 'error';

     
      }

    );
  }

  onDateChange(newDate: Date): void {
      this.previousDate = new Date(newDate);


  }

  onClickMostrar(){
    this.agregar = !this.agregar;
  }

  
 openExitoso(){
  const modalRef = this.modalService.open(RegistroExitosoComponent,
     {size: 'md'});

  modalRef.result.then((result) => {
  
  
  }, (reason) => {
  
  
  });
}


}
