import { UserService } from 'src/app/service/user/user.service';
import { Component, OnInit, Input } from '@angular/core';
import { UserFinca } from '../../../models/fincas';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PedidoClass } from '../../../models/pedidos';


@Component({
  selector: 'app-agregarpedido',
  templateUrl: './agregarpedido.component.html',
  styleUrls: ['./agregarpedido.component.css']
})
export class AgregarpedidoComponent implements OnInit {

  @Input() idDespacho: number;
  title: string;
  pedido: PedidoClass;

  usuarios: UserFinca[] = [];
  fincas: UserFinca[] = [];
  pedidoMinimo: number;
  show: boolean;
  urlPeticion: string;

  selectedValue: number;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.urlPeticion = this.router.url + '/' + this.idDespacho;
    console.log(this.router.url);
    this.pedidoMinimo = 5000;
    this.show = false;
    this.title = 'Agregar Pedido';
    this.pedido = new PedidoClass(this.idDespacho, 0, 5000, 0.0, 0, 0, 5000);
    this.userService.getFincasUser().subscribe(resp => {
      // console.log('noticias', resp );
      if (resp.status !== 'error') {

        this.usuarios = [];

        this.usuarios.push(...resp.userFincas);

        this.onChange(0);
        this.actualizar();
        this.show = true;

        return;
      }



    });
  }
  registrarPedido(formulario): void {
    this.actualizar();

    console.log(this.pedido);

    this.userService.storePedidos(this.pedido).subscribe(
      response => {
        console.log(response);
        // tslint:disable-next-line: triple-equals
        if (response.status == 'success') {
          formulario.reset();

          this.modalService.dismissAll('OK');

          // // this.router.navigate(['/surala/pedidos/', this.idDespacho]);
          // this.router.navigateByUrl('/surala/pedidos/', { skipLocationChange: true }).then(() => {
          //   location.reload();
          //   this.router.navigate(['/surala/pedidos/', this.idDespacho]
          //   );
          // });
        }
      },
      error => {
        console.log(error);

        // this.status = 'error';
      }
    );
    // console.log(this.usuarios);


  }

  actualizar() {
    this.pedido.adicional = (this.pedido.pedido * this.pedido.porcentaje) / 100;
    this.pedido.total = this.pedido.adicional + this.pedido.reposicion + this.pedido.pedido;

  }
  locationreload() {

    // To reload the entire page from the server
    location.reload();
  }
  onChange($id) {

    console.log($id);
    this.userService.getFincasUser($id).subscribe(resp => {
      // console.log('noticias', resp );
      if (resp.status !== 'error') {

        this.fincas = [];

        this.fincas.push(...resp.userFincas);




        return;
      }



    });
  }
}
