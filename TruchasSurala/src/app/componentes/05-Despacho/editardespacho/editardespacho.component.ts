import { Component, OnInit, Input } from '@angular/core';
import { RegistroExitosoComponent } from '../../01-Comunes/registro-exitoso/registro-exitoso.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DespachoClass } from 'src/app/models/despacho';
import { UserService } from 'src/app/service/user/user.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Despacho } from '../../../models/despacho';
import { DespachoService } from '../../../service/despacho/despacho.service';

@Component({
  selector: 'app-editardespacho',
  templateUrl: './editardespacho.component.html',
  styleUrls: ['./editardespacho.component.css']
})
export class EditardespachoComponent implements OnInit {

  firstFormGroup: FormGroup;
  minDate: Date;
  maxDate: Date;
  @Input() despacho: Despacho;
  myDateValue: Date;
  previousDate: Date;
  agregar: boolean;
  status: string;
  title: string;
  constructor(
              private despachoService: DespachoService,
              public datepipe: DatePipe,
              private activeModal: NgbActiveModal,
              private modalService: NgbModal,
              private _formBuilder: FormBuilder) {
    this.title = 'Actualización Despacho';
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


      Porcentaje: ['', Validators.required],
    });
  
    this.agregar = false;
  }

  onRegister(formulario): void {

    //  this.despacho.fecha = this.datepipe.transform(this.despacho.fechaEntrada, 'yyyy-MM-dd');
    //  this.despacho.fechaSalida = this.datepipe.transform(this.despacho.fechaEntrega, 'yyyy-MM-dd');

  
    console.log(this.despacho)
    this.despachoService.updateDespacho(this.despacho).subscribe(
      response => {
        console.log(response);
        // tslint:disable-next-line: triple-equals
        if (response.status == 'success') {
          formulario.reset();
          this.openExitoso();
          this.activeModal.close("OK");

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

  cerrar(){
    this.modalService.dismissAll();
  }
 openExitoso(){
  const modalRef = this.modalService.open(RegistroExitosoComponent,
     {size: 'md'});

  modalRef.result.then((result) => {
  
  
  }, (reason) => {
  
  
  });
}


}
