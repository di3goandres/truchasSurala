import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { AlevinosService } from 'src/app/service/alevinos/alevinos.service';
import { ProgramacionAlevinos } from '../../../models/alevinos/programacion.alevinos';

@Component({
  selector: 'app-alevinosprogramcion',
  templateUrl: './alevinosprogramcion.component.html',
  styleUrls: ['./alevinosprogramcion.component.css']
})
export class AlevinosprogramcionComponent implements OnInit {
  programacion: ProgramacionAlevinos[];
  displayedColumns: string[] = ['position', 'FechaSalida', 'Semana', 
  'dia', 'estado', 'seleccionar'];
  public dataSource = new MatTableDataSource<ProgramacionAlevinos>();
  @ViewChild('stepper', { static: false }) stepper: MatStepper;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  constructor(
    private service: AlevinosService
  ) { }

  ngOnInit(): void {
    this.consultarProgramacion();
  }

  consultarProgramacion() {
    this.service.consultarProgramacion().subscribe(
      OK => {
        console.log(OK)

        this.programacion = [];
        this.programacion.push(...OK.programacion);
        if (this.programacion == null || this.programacion.length == 0) {
          this.service.MostrarSnack("Sin datos de programación");
        } else {
          let sinprogramar = OK.programacion.filter(item => {
            return item.despachado == 0
          })
          if (sinprogramar.length > 0) {
            this.service.MostrarSnack("Tienes " + sinprogramar.length + ", Programaciones sin despachar. ")

          }


        }
        this.dataSource = new MatTableDataSource(this.programacion);
        this.dataSource.paginator = this.paginator

      },
      ERROR => {
        this.service.NoExitosoComun();

      },
    )

  }
}
