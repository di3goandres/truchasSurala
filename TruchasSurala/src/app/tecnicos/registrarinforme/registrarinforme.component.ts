import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListausuariosComponent } from '../../componentes/06-Pedidos/listausuarios/listausuarios.component';
import { UserFinca } from '../../models/fincas/fincas.user.response';

@Component({
  selector: 'app-registrarinforme',
  templateUrl: './registrarinforme.component.html',
  styleUrls: ['./registrarinforme.component.css']
})
export class RegistrarinformeComponent implements OnInit {

  firstFormGroup: FormGroup;
  usuario = new UserFinca();

  constructor(
    private modalService: NgbModal,
    private _formBuilder: FormBuilder


  ) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      finca: ['', Validators.required],
   


    });
  }

  openUsuarios() {
    const modalRef = this.modalService.open(ListausuariosComponent, { size: 'lg' });
   
    modalRef.result.then((result: UserFinca) => {
     console.log(result);
    //  this.pedido.id_finca = result.id
     this.usuario = result;
    }, (reason) => {

      if (reason === 'OK') {


      }
    });
  }
}
