import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { A_DiaDespachoRequest } from 'src/app/models/alevinos/alevinos.pedidos';
import { AlevinosService } from 'src/app/service/alevinos/alevinos.service';

@Component({
  selector: 'app-dia-despacho',
  templateUrl: './dia-despacho.component.html',
  styleUrls: ['./dia-despacho.component.css']
})
export class DiaDespachoComponent implements OnInit {
  firstFormGroup: FormGroup;
  request: A_DiaDespachoRequest;
  minDate: Date;
  maxDate: Date;
  constructor(
    private activeModal: NgbActiveModal,
    private _formBuilder: FormBuilder,
    public datepipe: DatePipe,
    private service: AlevinosService,


  ) {
    this.request = new A_DiaDespachoRequest();
    this.minDate = new Date();
    this.maxDate = new Date();
    //// validar la fecha minima de despacho 
    this.minDate.setDate(this.minDate.getDate() + 1);
    this.maxDate.setDate(this.maxDate.getDate() + 60);
    this.firstFormGroup = this._formBuilder.group({
      fecha: ['', Validators.required],
    });
  }

  myDateFilter = (d: Date): boolean => {
    let dstring = this.datepipe.transform(d, 'yyyy-MM-dd');

    d = new Date(dstring);
    d.setHours(d.getHours() + 5);

    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0;
  }
  ngOnInit(): void {

  }

  Cerrar() {
    this.activeModal.close("NOK")
  }

  Agregar() {
    this.service.GuardarDiaDespacho(this.request).subscribe(
      OK => { console.log(OK) 

        if(OK.code==200){
          this.service.Exitoso()
          this.activeModal.close("OK");
        }
        if(OK.code==201){
          this.service.NoExitoso("Fecha", "Ya existe una programación para esta fecha")
        }
        
    
      },
      ERROR => { console.log(ERROR) 
      
        this.service.NoExitosoComun()
      },
    )
  }
}
