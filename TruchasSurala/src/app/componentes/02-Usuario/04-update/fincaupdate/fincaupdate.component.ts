import { Component, OnInit, Input } from '@angular/core';
import { DatosDepartamento } from '../../../../models/dato.departament';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../../service/user/user.service';
import { Finca } from '../../../../../../../movil/src/app/models/fincas.user';

@Component({
  selector: 'app-fincaupdate',
  templateUrl: './fincaupdate.component.html',
  styleUrls: ['./fincaupdate.component.css']
})
export class FincaupdateComponent implements OnInit {
  // finca: FincasUsuario;
   @Input() finca: Finca;
   fincaUpdate: Finca;
  secondFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private userService: UserService


  ) { }



  actualizarCampos(){
 
    this.userService.updateFinca(this.fincaUpdate).subscribe(
      Ok => {
           console.log(Ok);
           this.activeModal.close('OK')

      },
      error=> {
        console.log(error);
      }
    )

  }

  Cerrar(){
    this.activeModal.close('normal')
  }

  ngOnInit(): void {


    this.secondFormGroup = this._formBuilder.group({
      direccion: ['', Validators.required],
      nombre: ['', Validators.required],
    })

    this.fincaUpdate = new Finca();
    this.fincaUpdate.id = this.finca.id;
    this.fincaUpdate.nombre = this.finca.nombre;
    this.fincaUpdate.direccion = this.finca.direccion;

  }

}
