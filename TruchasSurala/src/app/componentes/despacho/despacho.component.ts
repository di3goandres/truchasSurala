
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user/user.service';
import { Despachosroot, Caja, DespachoRootObject, Despacho } from '../../models/despacho';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AgregarcajaComponent } from './agregarcaja/agregarcaja.component';



@Component({
  selector: 'app-despacho',
  templateUrl: './despacho.component.html',
  styleUrls: ['./despacho.component.css']
})
export class DespachoComponent implements OnInit {

  public despacho: Despachosroot;
  public id;
  public actual: Despacho;
  public cajas: Caja[] = [];
  public agregar: boolean;
  public closeResult: string;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal) { }

  ngOnInit(): void {

    this.consultaInicial();
  }

  private consultaInicial(id = null) {
    this.agregar = false;
    if (id == null) {
      this.id = this.route.snapshot.paramMap.get('id');

    } else {
      this.id = id;
    }
    // console.log('id2:', this.route.snapshot.paramMap.get('id'));
    this.userService.getDespacho(this.id).subscribe(resp => {
      // console.log('noticias', resp );
      if (resp.status !== 'error') {

        this.cajas = [];
        this.cajas.push(...resp.cajas);

        this.despacho = resp;
        this.actual = resp.despacho;
        return;
      }
      this.despacho = resp;



    });
  }

  crearCaja(): void {
    this.agregar = !this.agregar;
    console.log(this.agregar);
    // this.router.navigate(['surala/despacho/caja/create/', this.id]);
  }


  open(content): void {
    const modalRef = this.modalService.open(AgregarcajaComponent);
    modalRef.componentInstance.idDespacho = this.id;
    modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log('result', result);
    }, (reason) => {




      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log('reason', reason);
      if (reason === 'OK') {
        console.log('entrre perras!!');
        this.consultaInicial(this.id);
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
