import { Pedido } from './../../../models/pedidos';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user/user.service';
import { User } from 'src/app/models/users';
import { Despacho } from 'src/app/models/despacho';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  actual: Despacho = new Despacho();
  pedidos: Pedido[] = [];
  id: string;
  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id == null) {
      this.router.navigate(['/surala/error']);
      return;
    }
    this.userService.getPedidos(this.id).subscribe(
      response => {
        if (response.status === 'success') {
          this.pedidos = [];
          this.pedidos.push(...response.pedido);

          console.log(response.pedido);
          this.actual = response.pedido[0].despacho;
        }
      },
      error => { }

    );
  }

}
