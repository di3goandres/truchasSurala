import { Component, OnInit, Input } from '@angular/core';

import { UserService } from 'src/app/service/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Despacho } from '../../../models/despacho.response';
import { CrearpedidosComponent } from '../../06-Pedidos/crearpedidos/crearpedidos.component';


@Component({
  selector: 'app-despachoactual',
  templateUrl: './despachoactual.component.html',
  styleUrls: ['./despachoactual.component.css']
})
export class DespachoactualComponent implements OnInit {
  public closeResult: string;
  public url: string;
  actual : Despacho;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,

  ) { }

  ngOnInit(): void {
  this.traerActual()
  }
  


  traerActual(){
    this.userService.getDespachoActual().subscribe(
      response=> {
        if(response.status==="OK"){
          if(response.despacho.length>0){
            this.actual = response.despacho[0];
          }
        }
      }
      
    );
  }

  open(): void {
    const modalRef = this.modalService.open(CrearpedidosComponent);
    modalRef.componentInstance.idDespacho = this.actual.id;
    modalRef.componentInstance.porcentaje = this.actual.porcentaje
    
    modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log('result', result);
    }, (reason) => {




      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log('reason', reason);
      if (reason === 'OK') {
      
        // this.consultaInicial(this.id);
        console.log(this.router.url);
      
        this.url = this.router.url;
        // this.router.navigate([this.url]);

        if (this.url === '/surala/pedidos/' + this.actual.id) {
          this.router.navigateByUrl(this.url, { skipLocationChange: true }).then(() => {
            location.reload();
            this.router.navigate(['/surala/pedidos/', this.actual.id]);
          });
          return;
        }
        this.router.navigate(['/surala/pedidos/', this.actual.id]);


      }
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
