import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from 'src/app/models/usuarios.fincas';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-lista-conductores',
  templateUrl: './lista-conductores.component.html',
  styleUrls: ['./lista-conductores.component.css']
})
export class ListaConductoresComponent implements OnInit {

  usuario: Usuario[] = [];
  @Output() devolver = new EventEmitter<Usuario>();

  constructor(
    private userService: UserService,
    private activeModal: NgbActiveModal
  ) {


  }
  displayedColumns: string[] = ['position', 'numero_identificacion', 'name', 'surname',
    'email', 'asociar'];

  public dataSource: MatTableDataSource<Usuario>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;



  refresh() {


    this.userService.getConductores().subscribe(
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



  asociarConductor(conductor: Usuario) {
    this.activeModal.close(conductor);
  }
  close(){
    this.activeModal.close("NOOK");
  }
}
