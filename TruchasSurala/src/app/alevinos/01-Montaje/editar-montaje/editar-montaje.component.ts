import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Select } from 'src/app/models/Datos.generales';
import { AlevinosService } from 'src/app/service/alevinos/alevinos.service';
import { AlevinosPedidos } from '../../../models/alevinos/alevinos.pedidos';

@Component({
  selector: 'app-editar-montaje',
  templateUrl: './editar-montaje.component.html',
  styleUrls: ['./editar-montaje.component.css']
})
export class EditarMontajeComponent implements OnInit, AfterViewInit {
  firstFormGroup: FormGroup;
  @Input() entrada: AlevinosPedidos;
  pedido: AlevinosPedidos;
  minDate: Date;

  TipoCompra: Select[] = [
    { value: 'TALLA', viewValue: 'TALLA' },
    { value: 'PESO', viewValue: 'PESO' }

  ]
  constructor(
    private activeModal: NgbActiveModal,
    public datepipe: DatePipe,
    private _formBuilder: FormBuilder,
    private serviceAlevino: AlevinosService,


  ) {

  }
  ngAfterViewInit() {
    console.log("after")
     this.Cambio(this.pedido.tipo);

    const invalid = [];
        const controls = this.firstFormGroup.controls;
        for (const name in controls) {
            if (controls[name].invalid) {
                invalid.push(name);
            }
        }
        console.log(invalid)
  }
  ngOnInit(): void {

   let activo = this.entrada.tipo == "TALLA";
    this.firstFormGroup = this._formBuilder.group({
      cantidad: ['', [Validators.min(200), Validators.required]],
      Peso: [{ value: '', disabled: true }, [Validators.min(10), Validators.max(3000), Validators.required],], // gramos 
      talla: [{ value: '', disabled: true }, [Validators.min(1), Validators.max(50), Validators.required]], // centimetros 
      fecha: ['', Validators.required],
      tipo: ['', Validators.required],
    });
    // this.Cambio(this.entrada.tipo);
    this.minDate = new Date();
    // this.minDate.setDate(this.minDate.getDate() + 1);
    this.pedido = new AlevinosPedidos();
    this.pedido.id = this.entrada.id;
    this.pedido.fechaProbable = new Date(this.entrada.fechaProbable);
    this.pedido.fechaProbableS = this.entrada.fechaProbableS;
    this.minDate.setDate(new Date(this.entrada.fechaProbable).getDate() + 1 );

    this.pedido.cantidad = this.entrada.cantidad;
    this.pedido.peso = this.entrada.peso;
    this.pedido.talla = this.entrada.talla;
    this.pedido.tipo = this.entrada.tipo;
   
    
   
    
  }
  close() {
    this.activeModal.close("OK")
  }
  closeNOOK() {
    this.activeModal.dismiss();
  }

  myDateFilter = (d: Date): boolean => {
    let dstring = this.datepipe.transform(d, 'yyyy-MM-dd');

    d = new Date(dstring);
    d.setHours(d.getHours() + 5);

    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0;
  }

  Calcular() {

  }

  Cambio(value) {
    console.log(value);
    const stakeTalla = this.firstFormGroup.get('talla');
    const stakePeso = this.firstFormGroup.get('Peso');
    if (value == "TALLA") {
      this.serviceAlevino.MostrarSnack("Mínimo 1, Máximo 50 Centimetros", "Vale");

      stakeTalla.enable();
      stakePeso.disable()

    } else if (value == "PESO") {
      this.serviceAlevino.MostrarSnack("Mínimo 10, Máximo 3.000 gramos", "atendido");


      stakeTalla.disable();
      stakePeso.enable()
    }

    stakeTalla.updateValueAndValidity();
    stakePeso.updateValueAndValidity();



  }

  Guardar() {
    this.pedido.fechaProbableS = this.datepipe.transform(this.pedido.fechaProbableS, 'yyyy-MM-dd');;
    console.log(this.pedido);
    this.serviceAlevino.ActualizarPedido(this.pedido).subscribe(
      OK => {
        this.serviceAlevino.Exitoso();
        this.close();
      },
      ERROR => {
        this.serviceAlevino.NoExitosoComun();

      },
    )
  }

}
