import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../../service/user/user.service';
import { Usuario } from '../../../../models/usuarios.fincas';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListafincasComponent } from '../../03-Fincas/listafincas/listafincas.component';
import { PasswordComponent } from '../../04-update/password/password.component';


@Component({
  selector: 'app-listausuario',
  templateUrl: './listausuario.component.html',
  styleUrls: ['./listausuario.component.css']
})
export class ListausuarioComponent implements OnInit {
  usuario: Usuario[]=[];
  
  constructor(
    private userService:UserService,
    private modalService: NgbModal

    ) { }
  displayedColumns: string[] = ['position','NumeroIdentificacion', 'Nombre', 
  'email', 'Actualizar', 'ver'];

  public dataSource = new MatTableDataSource<any>();;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.userService.getUsuarios().subscribe(
      response => {
        if(response.status=="success"){
          this.usuario.push(... response.Usuarios)
          this.dataSource = new MatTableDataSource(response.Usuarios);
          this.dataSource.paginator = this.paginator;
      
        }
       
      },
      error => {console.log(error)}
    )
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openBandejas(id){

    const modalRef = this.modalService.open(ListafincasComponent, {size: 'lg'});
    modalRef.componentInstance.UserId = id
    modalRef.result.then((result) => {
  
      console.log('result', result);
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      if (reason === 'OK') {
     
       
      }
    });
  }


  openPassword(id){

    const modalRef = this.modalService.open(PasswordComponent, {size: 'md'});
    modalRef.componentInstance.idUsuario = id
    modalRef.result.then((result) => {
  
      console.log('result', result);
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      if (reason === 'OK') {
     
       
      }
    });
  }

}
