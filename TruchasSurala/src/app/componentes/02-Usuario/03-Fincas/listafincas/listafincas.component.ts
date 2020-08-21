import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UserService } from '../../../../service/user/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Finca } from '../../../../models/fincas.response';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FincaupdateComponent } from '../../04-update/fincaupdate/fincaupdate.component';

@Component({
  selector: 'app-listafincas',
  templateUrl: './listafincas.component.html',
  styleUrls: ['./listafincas.component.css']
})
export class ListafincasComponent implements OnInit {

  @Input() UserId: number;

  constructor(
    private userService: UserService,
    private modalService: NgbModal
  ) { }
  displayedColumns: string[] = ['position', 'uno', 'dos',
    'tres', 'Actualizar'];

  public dataSource = new MatTableDataSource<Finca>();


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ngOnInit(): void {

    this.cargarInicial();
  }
  cargarInicial() {
    this.userService.getFincasUsuarios(this.UserId).subscribe(
      response => {
        console.log(response);
        this.dataSource = new MatTableDataSource(response.fincas);
        this.dataSource.paginator = this.paginator;
      },
      errror => { console.log(errror) },

    );
  }
  openUpdate(id) {
    const modalRef = this.modalService.open(FincaupdateComponent, { size: 'fluid' });
    modalRef.componentInstance.finca = id
    modalRef.result.then((result) => {
      this.cargarInicial();
      if (result === "OK") {
        this.cargarInicial();
      }
   
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      if (reason === 'OK') {
        this.cargarInicial();

      }
    });
  }

}
