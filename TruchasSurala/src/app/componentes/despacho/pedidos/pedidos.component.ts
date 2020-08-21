import { Pedido } from './../../../models/pedidos';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user/user.service';
import { User } from 'src/app/models/users';
import { Despacho } from 'src/app/models/despacho';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { DespachosComponent } from '../../despachos/despachos.component';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['position', 'NombreFinca', 
  'Pedido', 'Porcentaje',
  'adicionales', 'reposicion', 'totalPedido', 
  'FechaCreacion',  'VerGenerar'];

  
  actual: Despacho = new Despacho();
  pedidos: Pedido[] = [];
  id: string;
  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
             ) { }

  ngOnInit(): void {
  
    this.id = this.route.snapshot.paramMap.get('id');



    if (this.id == null) {
      this.router.navigate(['/surala/error']);
      return;
    }
    this.userService.getPedidos(this.id).subscribe(
      response => {
        console.log(response)
        if (response.status === 'success') {
          this.pedidos = [];
          if(response.pedido.length!==0){
            this.pedidos.push(...response.pedido);
           
          }
          this.dataSource = new MatTableDataSource(this.pedidos);
        }
      },
      error => { }

    );
  }

}
