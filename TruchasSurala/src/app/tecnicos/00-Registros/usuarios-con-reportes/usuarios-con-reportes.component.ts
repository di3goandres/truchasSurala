import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Usuario } from 'src/app/models/usuarios.fincas';
import { Select } from 'src/app/models/Datos.generales';
import { InformeService } from 'src/app/service/informe/informe.service';

@Component({
  selector: 'app-usuarios-con-reportes',
  templateUrl: './usuarios-con-reportes.component.html',
  styleUrls: ['./usuarios-con-reportes.component.css']
})
export class UsuariosConReportesComponent implements OnInit {

  @Input() Todos: any;
  usuario: Usuario[] = [];
  tipo: string = 'OVAS';
  tipos: Select[] = [
    { value: 'OVAS', viewValue: 'OVAS' },
    { value: 'ALEVINOS', viewValue: 'ALEVINOS' },
    { value: 'AMBOS', viewValue: 'AMBOS' },
  ]
  constructor(
    private userService: InformeService,
    private activeModal: NgbActiveModal,

  ) {


  }
  displayedColumns: string[] = ['position', 'numero_identificacion', 'name', 'surname',
    'email', 'tipo', 'seleccionar'];

  public dataSource: MatTableDataSource<Usuario>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  Cambiar() {
    let nuevo = this.usuario.filter(item => {
      return item.tipo_usuario == this.tipo
    })
    this.dataSource = new MatTableDataSource(nuevo);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  refresh() {


    this.userService.getUsuarios().subscribe(
      response => {
        console.log(response);
        if (response.status == "success") {
          this.usuario = []
          this.usuario.push(...response.Usuarios)
          this.dataSource = new MatTableDataSource(this.usuario);
          this.dataSource.paginator = this.paginator;

          this.dataSource.sort = this.sort;
          console.log(this.dataSource)

          if (this.Todos != null) {

            this.tipos = this.tipos.filter(item => {
              return item.value != 'OVAS'
            }
      
      
            );
            this.tipo = 'ALEVINOS'
            this.Cambiar();
          }
          // this.changeDetectorRefs.detectChanges();
        }

      },
      error => { console.log(error) }
    )
  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Usuario>();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.refresh();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  Cerrar() {
    this.activeModal.dismiss("Nothing")
  }
  seleccionar(element: Usuario) {
    this.activeModal.close(element)
  }



}
