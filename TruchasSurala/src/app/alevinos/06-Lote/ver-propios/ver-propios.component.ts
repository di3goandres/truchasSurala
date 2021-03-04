import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { LotesPropio } from 'src/app/models/alevinos/lotes.propio.response';
import { AlevinosService } from 'src/app/service/alevinos/alevinos.service';

@Component({
  selector: 'app-ver-propios',
  templateUrl: './ver-propios.component.html',
  styleUrls: ['./ver-propios.component.css']
})
export class VerPropiosComponent implements OnInit {

  lotesPropios: LotesPropio[];
  seleccionado: LotesPropio;
  firstFormGroup: FormGroup;



  displayedColumns: string[] = ['position', 'fechaLlegada', 'FechaDesove', 'Linea',
    'edad', 'numerolote', 'tamanio', 'editar'];

  public dataSource: MatTableDataSource<LotesPropio>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('stepper', { static: false }) stepper: MatStepper;
  minDate: Date;
  maxDate: Date;

  constructor(
    private service: AlevinosService,
    private _formBuilder: FormBuilder,
    public datepipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.seleccionado = new LotesPropio();

    this.minDate = new Date();
    this.maxDate = new Date();

    this.firstFormGroup = this._formBuilder.group({
      fecha_incubacion: ['', [Validators.required]],
      fecha_eclosion: ['', [Validators.required]],
      fecha_absorcion: ['', [Validators.required]],
      temp_eclosion: ['', [Validators.required, Validators.min(1), Validators.max(30)]],
      fecha_alimento: ['', [Validators.required]],



    });
    this.refresh()
  }

  refresh() {


    this.service.Propios().subscribe(
      response => {
        if (response.code == 200) {
          this.lotesPropios = []
          this.lotesPropios.push(...response.lotesPropios)
          this.dataSource = new MatTableDataSource(this.lotesPropios);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

        }

      },
      error => { console.log(error) }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  Editar(elemento: LotesPropio) {
    this.seleccionado = new LotesPropio();
    this.seleccionado = elemento;
    this.minDate = new Date(elemento.fecha_salida);
    this.minDate.setDate(this.minDate.getDate());
    this.maxDate.setDate(this.maxDate.getDate() + 10);
    this.stepper.next()

  }

  myDateFilter = (d: Date): boolean => {
    let dstring = this.datepipe.transform(d, 'yyyy-MM-dd');
    d = new Date(dstring);
    d.setHours(d.getHours() + 5);
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0;
  }

  Actualizar() {
    this.seleccionado.fecha_eclosion = this.datepipe.transform(this.seleccionado.fecha_eclosion, 'yyyy-MM-dd');
    this.seleccionado.fecha_incubacion = this.datepipe.transform(this.seleccionado.fecha_incubacion, 'yyyy-MM-dd');
    this.seleccionado.fecha_fin_aborcion = this.datepipe.transform(this.seleccionado.fecha_fin_aborcion, 'yyyy-MM-dd');
    this.seleccionado.fecha_primer_alimento = this.datepipe.transform(this.seleccionado.fecha_primer_alimento, 'yyyy-MM-dd');

    this.service.UpdatePropios(this.seleccionado).subscribe(
      OK => { 
        this.service.Exitoso();
        // this.stepper.previous();
        this.refresh();
      },
      ERROR => { 
        this.service.NoExitosoComun();
      },
    )
  }


}
