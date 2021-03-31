import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../../../../service/user/user.service';
import { Usuario } from '../../../../models/usuarios.fincas';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListafincasComponent } from '../../03-Fincas/listafincas/listafincas.component';
import { PasswordComponent } from '../../04-update/password/password.component';
import { MatSort } from '@angular/material/sort';
import { AsociarfincaComponent } from '../../03-Fincas/asociarfinca/asociarfinca.component';
import { Select } from '../../../../models/Datos.generales';


@Component({
  selector: 'app-listausuario',
  templateUrl: './listausuario.component.html',
  styleUrls: ['./listausuario.component.css']
})
export class ListausuarioComponent implements OnInit {
  usuario: Usuario[] = [];
  tipo: string = 'OVAS';
  tipos: Select[] = [
    { value: 'OVAS', viewValue: 'OVAS' },
    { value: 'ALEVINOS', viewValue: 'ALEVINOS' },
    { value: 'AMBOS', viewValue: 'AMBOS' },
  ]
  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private changeDetectorRefs: ChangeDetectorRef
  ) {


  }
  displayedColumns: string[] = ['position', 'numero_identificacion', 'name', 'surname',
    'email', 'tipo', 'Actualizar', 'ver', 'asociar'];

  public dataSource: MatTableDataSource<Usuario>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;



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

  openBandejas(id) {

    const modalRef = this.modalService.open(ListafincasComponent, { size: 'lg' });
    modalRef.componentInstance.UserId = id
    modalRef.result.then((result) => {

      console.log('result', result);
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      if (reason === 'OK') {


      }
    });
  }

  openAsociarFincas(id) {

    const modalRef = this.modalService.open(AsociarfincaComponent, { size: 'lg' });
    modalRef.componentInstance.UserId = id
    modalRef.result.then((result) => {

      console.log('result', result);
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      if (reason === 'OK') {


      }
    });
  }


  openPassword(id) {

    const modalRef = this.modalService.open(PasswordComponent, { size: 'md' });
    modalRef.componentInstance.idUsuario = id
    modalRef.result.then((result) => {

      console.log('result', result);
      console.log('result', result);
      if(result==="OK"){
        this.userService.registroExitoso();
        this.userService.openSnackBar("Se actualizo la contraseña exitosamente","");


      } 
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      if (reason === 'OK') {


      }
    });
  }

  Cambiar() {
    let nuevo = this.usuario.filter(item => {
      return item.tipo_usuario == this.tipo
    })
    this.dataSource = new MatTableDataSource(nuevo);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }
}
