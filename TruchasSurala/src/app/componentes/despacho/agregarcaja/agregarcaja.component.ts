import { Cajas } from './../../../models/cajas';
import { Component, OnInit, Input } from '@angular/core';
import { DespachoClass } from '../../../models/despacho';
import { UserService } from '../../../service/user/user.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agregarcaja',
  templateUrl: './agregarcaja.component.html',
  styleUrls: ['./agregarcaja.component.css']
})
export class AgregarcajaComponent implements OnInit {
  @Input() idDespacho: number;
  title: string;
  minDate: Date;
  maxDate: Date;
  caja: Cajas ;
  size: number;
  total_bandeja: number;
  status: string;

  myDateValue: Date;
  previousDate: Date;
  closeResult: string;

  constructor(private userService: UserService,
              private modalService: NgbModal,
              public datepipe: DatePipe,
              private router: Router,
              private route: ActivatedRoute) {

    this.title = 'Registro de Cajas para el Despacho';
  }

  ngOnInit(): void {

    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 240);
    this.maxDate.setDate(this.maxDate.getDate());
    this.caja = new Cajas(this.idDespacho, this.idDespacho, '', 5, 0.0, 0.0, 0, 0, '', 1);
  }

  registrarCaja(formulario) {

    this.caja.fecha_desove = this.datepipe.transform(this.caja.fecha_desove, 'yyyy-MM-dd');

    console.log(this.caja);
    this.userService.storeCajasLotes(this.caja).subscribe(
      response => {
        console.log(response);
        // tslint:disable-next-line: triple-equals
        if (response.status == 'success') {
          formulario.reset();
          this.modalService.dismissAll('OK');

          this.router.navigate(['/surala/despacho/', this.idDespacho]);
        } else {
          this.status = 'error';
        }
      },
      error => {
        console.log(error);

        this.status = 'error';
      }
    );


  }

  actualizar(){
    this.caja.ovasml = (this.size * 33.8)/1000
  }

  actualizarBandeja(){
    this.caja.total_lote = (this.total_bandeja * this.caja.numero_cajas)
  }

  onDateChange(newDate: Date): void {
    this.previousDate = new Date(newDate);


  }
  open(content): void{
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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
