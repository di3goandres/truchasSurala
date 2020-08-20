import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UserService } from '../../../../service/user/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Finca } from '../../../../models/fincas.response';

@Component({
  selector: 'app-listafincas',
  templateUrl: './listafincas.component.html',
  styleUrls: ['./listafincas.component.css']
})
export class ListafincasComponent implements OnInit {

  @Input() UserId: number;
 
  constructor(private userService:UserService) { }
  displayedColumns: string[] = ['position','uno', 'dos', 
  'tres', 'Actualizar'];

  public dataSource = new MatTableDataSource<Finca>();


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.userService.getFincasUsuarios(this.UserId).subscribe(
      response => { 
        console.log(response);
        this.dataSource = new MatTableDataSource(response.fincas);
        this.dataSource.paginator = this.paginator; 
      },
      errror => { console.log(errror) },

    );
  }

}
