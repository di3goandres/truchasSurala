import { Component, OnInit, Input } from '@angular/core';
import { PedidoClass } from 'src/app/models/pedidos';
import { UserFinca } from 'src/app/models/fincas/fincas.user.response';
import { UserService } from '../../../service/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ListausuariosComponent } from '../listausuarios/listausuarios.component';
import { ListapedidosComponent } from '../listapedidos/listapedidos.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crearpedidos',
  templateUrl: './crearpedidos.component.html',
  styleUrls: ['./crearpedidos.component.css']
})
export class CrearpedidosComponent implements OnInit {


  @Input() idDespacho: number;
  @Input() porcentaje: number;
  @Input() pendiente: number;
  title: string;
  pedido: PedidoClass;
  firstFormGroup: FormGroup;

  usuario: UserFinca;
  pedidoMinimo: number;
  show: boolean;
  urlPeticion: string;

  selectedValue: number;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private _formBuilder: FormBuilder,


    // private actualizarLista: ListapedidosComponent
  ) { }

  ngOnInit(): void {
    this.usuario = new UserFinca()
    this.urlPeticion = this.router.url + '/' + this.idDespacho;
    console.log(this.router.url);
    this.pedidoMinimo = 0;
    this.show = false;
    this.title = 'Agregar Pedido';
    this.pedido = new PedidoClass(this.idDespacho, this.porcentaje);
    console.log(this.porcentaje)


    this.firstFormGroup = this._formBuilder.group({
      pedidoMinimo: ['', [Validators.min(0), Validators.max(this.pendiente)]],
      Pedido: ['', [Validators.min(0), Validators.max(this.pendiente)]],
      porcentaje: ['', [Validators.min(0), Validators.max(100)]],
      reposicion: ['', [Validators.min(0)]],
      adicional: ['', [Validators.min(0)]],






    });

  }
  registrarPedido(): void {
      this.actualizar();

 
      this.userService.storePedidos(this.pedido).subscribe(
        response => {
          console.log(response);
          // tslint:disable-next-line: triple-equals
          if (response.status == 'success') {
           
            // this.actualizarLista.refresh();
            this.activeModal.close('OK');
          }
        },
        error => {
          console.log(error);

        }
      );
    


  }

  actualizar() {
    
 
      this.pedido.adicional = Math.round((this.pedido.pedido * this.pedido.porcentaje) / 100);
      this.pedido.total = Math.round(this.pedido.adicional + this.pedido.reposicion + this.pedido.pedido);
    


  }
  locationreload() {

    // To reload the entire page from the server
    location.reload();
  }



  openUsuarios() {
    const modalRef = this.modalService.open(ListausuariosComponent, { size: 'lg' });

    modalRef.result.then((result: UserFinca) => {
      console.log(result);
      this.pedido.id_finca = result.id
      this.usuario = result;
      if (this.usuario.propia) {
        let number = 1 + (this.porcentaje/100)
        console.log(number)
        let valorePedido = (this.pendiente ) / number;
        this.pedido.pedido =  Math.round(valorePedido);
      
          this.actualizar();
      }
    }, (reason) => {

      if (reason === 'OK') {


      }
    });
  }

}
