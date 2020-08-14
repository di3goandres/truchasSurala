import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Departamento, Municipio } from 'src/app/models/Datos.generales';
import { UserService } from 'src/app/service/user/user.service';
import { DatosDepartamento } from '../../../models/dato.departament';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {

  Departamentos: Departamento[] = [];
  Municipios: Municipio[] = [];
  MunicipioSeleccionado: Municipio[] = [];
  codigoDepartamento: number;
  @Output() datoSalida = new EventEmitter<DatosDepartamento>();
  datosDepartamento: DatosDepartamento = new DatosDepartamento();
  codigoMunicipio: number;
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.consultarDatosDepartamentos();
  }
  cambioDepartamento(id) {

    this.MunicipioSeleccionado = this.Municipios.filter(municipio => {
      return municipio.cod_dane_departamento === id;
    });

    this.codigoDepartamento = id;

    let depar = this.Departamentos.find(depar=> {
      return depar.id_departamento === this.codigoDepartamento;
    })
    this.datosDepartamento.NombreDepartamento = depar.departamento
    this.datosDepartamento.Valido = false;
    this.datoSalida.emit(this.datosDepartamento);
  }

  cambioMunicipio(id) {
    this.codigoMunicipio = id;


    let muni = this.MunicipioSeleccionado.find(munic=> {
      return munic.id === this.codigoMunicipio;
    })
    this.datosDepartamento.NombreMunicipio = muni.municipio;
    this.datosDepartamento.Codigo = id;
    this.datosDepartamento.Valido = true;
    this.datoSalida.emit(this.datosDepartamento);


  }

  consultarDatosDepartamentos()
  {
    this.userService.getDatosDepartamentos().subscribe(
      response => 
      {
        this.Departamentos= [];
        this.Departamentos.push(...response.departamentos)
        this.Municipios.push(...response.municipios)
      },
      error => {
        console.log(error);
      }
    )
  }
}
