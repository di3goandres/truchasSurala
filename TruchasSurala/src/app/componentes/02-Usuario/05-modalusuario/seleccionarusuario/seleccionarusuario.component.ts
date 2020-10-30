import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../../../../models/usuarios.fincas';
import { Select } from '../../../../models/Datos.generales';
import { UserService } from '../../../../service/user/user.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-seleccionarusuario',
  templateUrl: './seleccionarusuario.component.html',
  styleUrls: ['./seleccionarusuario.component.css']
})
export class SeleccionarusuarioComponent implements OnInit {
  usuario: Usuario[] = [];
  tipo: string = 'OVAS';
  tipos: Select[] = [
    { value: 'OVAS', viewValue: 'OVAS' },
    { value: 'ALEVINOS', viewValue: 'ALEVINOS' },
    { value: 'AMBOS', viewValue: 'AMBOS' },
  ]
  constructor(
    private userService: UserService,
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
        if (response.status == "success") {
          this.usuario = []
          this.usuario.push(...response.Usuarios)
          this.dataSource = new MatTableDataSource(this.usuario);
          this.dataSource.paginator = this.paginator;

          this.dataSource.sort = this.sort;
          console.log(this.dataSource)
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
