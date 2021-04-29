import { Component, OnInit, ViewChild } from '@angular/core';
import { User, FincasUsuario } from '../../models/users';
import { UserService } from '../../service/user/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Select, Municipio } from 'src/app/models/Datos.generales';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { DatosDepartamento } from '../../models/dato.departament';
import { Departamento } from '../../models/Datos.generales';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  tipo: string = 'OVAS';
  tipos: Select [] =[
    { value: 'OVAS',  viewValue: 'OVAS'},
    { value: 'ALEVINOS',  viewValue: 'ALEVINOS'},
    { value: 'AMBOS',  viewValue: 'AMBOS'},
  ]
  Departamentos: Departamento[] = [];
  Municipios: Municipio[] = [];
  MunicipioSeleccionado: Municipio[] = [];
  codigoDepartamento: number;
  continuarGuardar: boolean = false;
  datosDepartamento: DatosDepartamento = new DatosDepartamento();
  codigoMunicipio: number;

  @ViewChild('stepper') private myStepper: MatStepper;

  @ViewChild('tablefincas') table: MatTable<any>;
  displayedColumns: string[] = ['position', 'Departamento',
    'Municipio',
    'NombreDeLaFinca', 'Direccion', 'Quitar'];
  dataSource: FincasUsuario[] = []
  tiposIdentificacion: Select[] = [
    { value: '1', viewValue: 'CC' },
    { value: '2', viewValue: 'NIT' }

  ]
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  ocultar: boolean = false;
  user: User;
  public title: string;
  public status: string;
  public mail: boolean;
  public password: boolean;
  public identificacion: boolean;

  public Nombre: string;

  public errors: any[];
  fincas: FincasUsuario[] = [];
  finca: FincasUsuario;

  constructor(
    private userService: UserService,
    private _formBuilder: FormBuilder
  ) {
    this.password = false;
    this.title = 'Registro';
    this.user = new User();


  }
  eliminar(element: FincasUsuario) {
    this.fincas = this.fincas.filter(item => {
      return item.position !== element.position
    })
    let conteo2 = 0;

    this.fincas.forEach(item => {
      conteo2 += 1;
      item.position = conteo2;
    })

    let conteo = this.fincas.length;
    if (conteo === 0) {
      this.continuarGuardar = false;
    } else {
      this.continuarGuardar = true;

    }
    this.table.renderRows();
    this.activarFormulario();

  }

  onNotificar(item: DatosDepartamento) {

    this.finca.municipio = item.Codigo;
    this.finca.NombreDepartamento = item.NombreDepartamento;
    this.finca.NombreMunicipio = item.NombreMunicipio;
    this.datosDepartamento = item;

  }

  activarFormulario() {
    const stakeControl = this.secondFormGroup.get('direccion');
    const stakeControl2 = this.secondFormGroup.get('Nombre');

    if (this.continuarGuardar) {
      stakeControl.setValidators([Validators.nullValidator]);
      stakeControl2.setValidators([Validators.nullValidator]);

    } else {
      stakeControl.setValidators([Validators.required]);
      stakeControl2.setValidators([Validators.nullValidator]);


    }
    stakeControl.updateValueAndValidity();
    stakeControl2.updateValueAndValidity();

  }
  addFinca() {

    let conteo = this.fincas.length + 1;
    this.finca.position = conteo;
    this.finca.nombre = this.Nombre

    let nuevo = new FincasUsuario(
      conteo,
      this.Nombre,
      this.finca.municipio,
      this.finca.NombreMunicipio,
      this.finca.NombreDepartamento,
      this.finca.direccion);





    let conteo2 = 0;

    this.fincas.push(nuevo);

    this.fincas.forEach(item => {
      conteo2 += 1;
      item.position = conteo2;
    })
    this.Nombre = "";
    this.finca.direccion = ""
    this.continuarGuardar = true;
    this.table.renderRows();
    this.activarFormulario();


  }

  cambioDepartamento(id) {

    this.MunicipioSeleccionado = this.Municipios.filter(municipio => {
      return municipio.cod_dane_departamento === id;
    });

    this.codigoDepartamento = id;

    let depar = this.Departamentos.find(depar => {
      return depar.id_departamento === this.codigoDepartamento;
    })
    this.datosDepartamento.NombreDepartamento = depar.departamento

  }

  cambioMunicipio(id) {
    this.codigoMunicipio = id;


    let muni = this.MunicipioSeleccionado.find(munic => {
      return munic.id === this.codigoMunicipio;
    })
    this.datosDepartamento.NombreMunicipio = muni.municipio;
    this.datosDepartamento.Codigo = id;



  }

  consultarDatosDepartamentos() {
    this.userService.getDatosDepartamentos().subscribe(
      response => {
        this.Departamentos = [];
        this.Departamentos.push(...response.departamentos)
        this.Municipios.push(...response.municipios)
      },
      error => {
        console.log(error);
      }
    )
  }

  goInicio(){
      this.fincas =[];
      this.status =''
      this.user = new User();
      this.ocultar = false;
      this.myStepper.reset();
  }
  Guardar(): void {


    this.user.Fincas = [];
    this.user.Fincas = this.fincas;

    this.userService.registerUser(this.user).subscribe(
      response => {
        console.log(response);
        // tslint:disable-next-line: triple-equals
        if (response.status == 'success') {
          this.status = response.status;
          this.mail = false;
          this.identificacion = false;
          this.ocultar = true;

        } else {
          this.status = 'error';
          if (response.errors.email != null) {
            this.mail = true;
          }
          if (response.errors.numero_identificacion != null) {
            this.identificacion = true;
          }

        }
      },
      error => {
        this.status = 'error';

        console.log(error as any);
      }

    );
    // f

  }
  ngOnInit(): void {
 
 
    this.consultarDatosDepartamentos();

    this.finca = new FincasUsuario(0, '', 0, '', '', '');

    this.firstFormGroup = this._formBuilder.group({
      nombrePersona: ['', Validators.required],
      surname: ['', Validators.required],
      TipoIden: ['', Validators.required],
      NumeroIden: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Telefono: ['', Validators.required],
      Tipo: ['', Validators.required]


    });


    this.secondFormGroup = this._formBuilder.group({
      direccion: ['', Validators.required],
      Nombre: ['', Validators.required],
    })

  }
}
