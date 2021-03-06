import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LotesPropio } from 'src/app/models/alevinos/lotes.propio.response';
import { AlevinosService } from 'src/app/service/alevinos/alevinos.service';

@Component({
  selector: 'app-seleccionar-lote',
  templateUrl: './seleccionar-lote.component.html',
  styleUrls: ['./seleccionar-lote.component.css']
})
export class SeleccionarLoteComponent implements OnInit {

  lotesPropios: LotesPropio[];
  seleccionado: LotesPropio;
  displayedColumns: string[] = ['position', 'fechaLlegada', 'FechaDesove', 'Linea',
    'edad', 'numerolote', 'tamanio', 'editar'];

  public dataSource: MatTableDataSource<LotesPropio>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('stepper', { static: false }) stepper: MatStepper;

  @Output() asociarLote = new EventEmitter<LotesPropio>();

  constructor(
    private service: AlevinosService,
    // private activeModal: NgbActiveModal,


  ) { }

  ngOnInit(): void {
    this.refresh()
  }

  refresh() {


    this.service.PropiosListos().subscribe(
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

  Asociar(element: LotesPropio) {
    // this.entrada = this.entrada.filter(item => {
    //   return item.id != element.id
    // })
    console.log(element);
    this.asociarLote.emit(element);
    // this.activeModal.dismiss(element)
  }

  // close() {
  //   this.activeModal.close("OK")
  // }
  // closeNOOK() {
  //   this.activeModal.dismiss();
  // }
}
