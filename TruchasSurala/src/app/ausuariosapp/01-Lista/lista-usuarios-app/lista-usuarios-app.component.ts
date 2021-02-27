import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Select } from 'src/app/models/Datos.generales';
import { Usuario } from 'src/app/models/usuarios.fincas';
import { UsuarioappService } from 'src/app/service/usuarioapp/usuarioapp.service';
import { PasswordComponent } from '../../../componentes/02-Usuario/04-update/password/password.component';

@Component({
  selector: 'app-lista-usuarios-app',
  templateUrl: './lista-usuarios-app.component.html',
  styleUrls: ['./lista-usuarios-app.component.css']
})
export class ListaUsuariosAPPComponent implements OnInit {
  usuario: Usuario[] = [];
  tipo: string = 'ADMIN';
  tipos: Select[] = [
    { value: 'ADMIN', viewValue: 'ADMINISTRADOR' },
    { value: 'ALEVINOS', viewValue: 'ALEVINOS' },
    { value: 'OVAS', viewValue: 'OVAS' },
    { value: 'TECNICO', viewValue: 'ASESOR TÉCNICO' },

  ]
  displayedColumns: string[] = ['position', 'numero_identificacion', 'name', 'surname',
  'email', 'role', 'Actualizar'];

  public dataSource: MatTableDataSource<Usuario>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(
      private userService: UsuarioappService,
      private modalService: NgbModal,
    ) { }

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

  Cambiar() {
    let nuevo = this.usuario.filter(item => {
      return item.role == this.tipo
    })
    this.dataSource = new MatTableDataSource(nuevo);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  openPassword(id) {

    const modalRef = this.modalService.open(PasswordComponent, { size: 'lg' });
    modalRef.componentInstance.idUsuario = id
    modalRef.result.then((result) => {

      console.log('result', result);
      if(result=="OK"){
        this.userService.Exitoso();
        this.userService.MostrarSnack("Se actualizo la contraseña exitosamente");


      }
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      if (reason === 'OK') {


      }
    });
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
          
     
        }

      },
      error => { console.log(error) }
    )
  }

}
