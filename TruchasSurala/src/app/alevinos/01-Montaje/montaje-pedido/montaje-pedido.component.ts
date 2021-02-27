import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListausuariosComponent } from '../../../componentes/06-Pedidos/listausuarios/listausuarios.component';
import { UserFinca } from '../../../models/fincas/fincas.user.response';
import { SeleccionarusuarioComponent } from '../../../componentes/02-Usuario/05-modalusuario/seleccionarusuario/seleccionarusuario.component';
import { Usuario } from '../../../models/usuarios.fincas';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { AlevinosPedidos, AlevinosPedidosRequest } from '../../../models/alevinos/alevinos.pedidos';
import { AlevinosService } from '../../../service/alevinos/alevinos.service';
import { Select } from '../../../models/Datos.generales';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-montaje-pedido',
  templateUrl: './montaje-pedido.component.html',
  styleUrls: ['./montaje-pedido.component.css']
})
export class MontajePedidoComponent implements OnInit {
  displayedColumns: string[] = ['position', 'FechaSalida', 'Semana',
    'dia', 'talla', 'peso', 'cantidad'];
  public dataSource = new MatTableDataSource<AlevinosPedidos>();
  @ViewChild('stepper', { static: false }) stepper: MatStepper;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  pedidosAlevinosPedidos: AlevinosPedidos[] = [];
  Exitosos: AlevinosPedidos[] = [];
  Errores: AlevinosPedidos[] = [];


  requestAlevinos: AlevinosPedidosRequest;
  validaciones: AlevinosPedidos[] = [];
  nuevo = new AlevinosPedidos();

  addDays = 0;
  repeticiones: Select[];
  TipoCompra: Select[] = [
    { value: 'TALLA', viewValue: 'TALLA' },
    { value: 'PESO', viewValue: 'PESO' }

  ]
  Periodicidad: Select[] = [
    { value: 'UNICO', viewValue: 'UNICO' },
    { value: 'QUINCENAL', viewValue: 'QUINCENAL' },
    { value: 'MENSUAL', viewValue: 'MENSUAL' },
    { value: 'BIMENSUAL', viewValue: 'BIMENSUAL' },
    { value: 'TRIMESTRAL', viewValue: 'TRIMESTRAL' }

  ]
  usuario: UserFinca;
  pedido: AlevinosPedidos
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  minDate: Date;
  maxDate: Date;
  constructor(
    private modalService: NgbModal,
    private _formBuilder: FormBuilder,
    private serviceAlevino: AlevinosService,
    public datepipe: DatePipe,


  ) {
    this.usuario = new UserFinca();
    this.pedido = new AlevinosPedidos();
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() + 1);
    this.maxDate.setDate(this.maxDate.getDate() + 60);

  }
  calcularRepeticiones(number) {
    this.repeticiones = [];
    let i = 1;
    if(number!= 1){
      i = 2
    }
    for (i; i <= number; i++) {
      let nuevo = new Select();
      nuevo.value = i.toString()
      nuevo.viewValue = i.toString();
      this.repeticiones.push(nuevo)
    }
  }
  Cambio(value) {
    console.log(value);
    const stakeTalla = this.secondFormGroup.get('talla');
    const stakePeso = this.secondFormGroup.get('Peso');
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

  CambioPeriodicidad(value) {
    switch (this.pedido.periodicidad) {
      case 'UNICO':
        this.calcularRepeticiones(1);
        this.addDays = 0;
        break;
      case 'QUINCENAL':
        this.calcularRepeticiones(27);
        this.addDays = 15;

        break;
      case 'MENSUAL':
        this.calcularRepeticiones(12);
        this.addDays = 30;

        break;
      case 'BIMENSUAL':
        this.calcularRepeticiones(6);
        this.addDays = 60;

        break;
      case 'TRIMESTRAL':
        this.calcularRepeticiones(4);
        this.addDays = 90;

        break;
      default:
        break;
    }
  }

   myDateFilter = (d: Date): boolean => {
     let dstring =  this.datepipe.transform(d, 'yyyy-MM-dd');

    d = new Date(dstring);
    d.setHours(d.getHours() + 5);
  
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0  ;
  }
  Calcular() {

    let fechaActual = "";
    let fechaItems = new Date()
    if (this.secondFormGroup.valid) {
      console.log(this.pedido.fechaProbable);
      fechaActual = this.datepipe.transform(this.pedido.fechaProbable, 'yyyy-MM-dd');

      fechaItems = new Date(fechaActual);
      fechaItems.setHours(fechaItems.getHours() + 5);


      this.pedidosAlevinosPedidos = [];
      for (let i = 0; i < this.pedido.repeticiones; i++) {
        this.nuevo = new AlevinosPedidos();
        this.nuevo.idUserFinca = 0;
        this.nuevo.tipo = this.pedido.tipo;
        this.nuevo.cantidad = this.pedido.cantidad;
        this.nuevo.cantidad = this.pedido.cantidad;
        if (this.nuevo.tipo == "TALLA") {
          this.nuevo.talla = this.pedido.talla;
          this.nuevo.peso = 0;
        } else if (this.nuevo.tipo == "PESO") {
          this.nuevo.peso = this.pedido.peso;
          this.nuevo.talla = 0;
        }
        if (i != 0) {
          fechaItems.setDate(fechaItems.getDate() + this.addDays)

        }
        this.nuevo.fechaProbable = fechaItems;
        this.nuevo.fechaProbableS = this.datepipe.transform(fechaItems, 'yyyy-MM-dd');;
        this.nuevo.dia = this.calcularDiaSemana(fechaItems);

        if( this.nuevo.dia =="Domingo"){
          fechaItems.setDate(fechaItems.getDate() + 1)
          this.nuevo.fechaProbable = fechaItems;
          this.nuevo.dia = this.calcularDiaSemana(fechaItems);
          this.nuevo.fechaProbableS = this.datepipe.transform(fechaItems, 'yyyy-MM-dd');;

        }
    
        this.nuevo.semana = this.getWeekNumber(fechaItems);
        this.validaciones.push(this.nuevo)
      }
      this.pedidosAlevinosPedidos.push(...this.validaciones)
      this.validaciones = []




    }

    this.dataSource = new MatTableDataSource(this.pedidosAlevinosPedidos);
    this.dataSource.paginator = this.paginator

  }


 getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    // Get first day of year
    let yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    let weekNo = Math.ceil(( ( (d.valueOf() - yearStart.valueOf()) / 86400000) + 1)/7);
    // Return array of year and week number
    return weekNo;
}
  calcularDiaSemana(date) {
    let day = "";
    switch (new Date(date).getDay()) {
      case 0:
        day = "Domingo";
        break;
      case 1:
        day = "Lunes";
        break;
      case 2:
        day = "Martes";
        break;
      case 3:
        day = "Miércoles";
        break;
      case 4:
        day = "Jueves";
        break;
      case 5:
        day = "Viernes";
        break;
      case 6:
        day = "Sabado";
    }
    return day;
  }
  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      finca: ['', Validators.required],
    });

    this.secondFormGroup = this._formBuilder.group({
      cantidad: ['', [Validators.min(200), Validators.required]],
      Peso: [{ value: '', disabled: true }, [Validators.min(10), Validators.max(3000), Validators.required],], // gramos 
      talla: [{ value: '', disabled: true }, [Validators.min(1), Validators.max(50), Validators.required]], // centimetros 
      Repeticiones: [{ value: '', disabled: false }, [Validators.min(1), Validators.max(55), Validators.required],], // gramos 
      Periodicidad: ['', Validators.required], // centimetros 
      fecha: ['', Validators.required],
      tipo: ['', Validators.required],


    });
  }

  openUsuarios() {
    const modalRef = this.modalService.open(ListausuariosComponent, { size: 'xl' });
    modalRef.componentInstance.alevinos = "ALEVINOS"
    modalRef.result.then((result: UserFinca) => {
      if (result != null) {
        this.stepper.next()
        this.pedido = new AlevinosPedidos();
        this.usuario = result;
        this.pedido.idUserFinca = this.usuario.id
        this.requestAlevinos = new AlevinosPedidosRequest()
        this.requestAlevinos.idUserFinca = this.usuario.id;
        this.requestAlevinos.alevinosPedidos =[];

      }

    }, (reason) => {
      if (reason === 'OK') {
      }
    });
  }

  guardar() {
    this.Exitosos = [];
    this.Errores = [];
  
    this.requestAlevinos.alevinosPedidos = [];
    this.requestAlevinos.alevinosPedidos.push(...this.pedidosAlevinosPedidos);
    this.serviceAlevino.guardarPedido(this.requestAlevinos).subscribe(
      OK => {
        console.log(OK)
        this.stepper.next();
        if(OK.code==200){
          this.serviceAlevino.Exitoso();
          this.Exitosos = [];
          this.Exitosos.push(...OK.OK);
        }else{
          if(OK.duplicados != null ){
            this.Exitosos = [];
            this.Exitosos.push(...OK.OK);
            this.Errores = [];
            this.Errores.push(...OK.duplicados);
            console.log(this.Errores)
            this.serviceAlevino.MostrarSnack("Existen pedidos registrados previamente", "De acuerdo")


          }
        }
      },
      ERROR => {
        console.log(ERROR)

        this.serviceAlevino.NoExitosoComun();


      },
    )
  }

  setStakeValidators(): void {


  }
}
