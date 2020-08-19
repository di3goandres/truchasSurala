import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../../service/user/user.service';
import { Usuario } from '../../../../models/usuarios.fincas';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-listausuario',
  templateUrl: './listausuario.component.html',
  styleUrls: ['./listausuario.component.css']
})
export class ListausuarioComponent implements OnInit {
  usuario: Usuario[]=[];
  constructor(private userService:UserService) { }
  displayedColumns: string[] = ['position','NumeroIdentificacion', 'Nombre', 
  'email', 'Actualizar'];

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
          console.log(this.usuario);
        }
       
      },
      error => {console.log(error)}
    )
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
