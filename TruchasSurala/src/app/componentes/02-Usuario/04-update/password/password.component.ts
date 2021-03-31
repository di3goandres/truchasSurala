import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../../service/user/user.service';
import { UpdateUser } from '../../../../models/update.pass';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  firstFormGroup: FormGroup;

  @Input() idUsuario: number;
  mostrar:boolean= false;
  usuario: UpdateUser;
  constructor(
    private userService: UserService,
    private _formBuilder: FormBuilder,
    public activeModal: NgbActiveModal

  ) { }

  ngOnInit(): void {


    this.firstFormGroup = this._formBuilder.group({
      password: ['', Validators.required],
     

    });
    this.usuario = new UpdateUser();
    this.usuario.id = this.idUsuario;
    this.usuario.password = '';

   
  }

  cambiarPassword(){
    console.log(this.usuario);
    this.userService.updatePassUser(this.usuario).subscribe(
      ok => {{
         this.activeModal.close("OK")
         console.log(ok);
      }},
      error =>{
         this.userService.registroNoExitoso("Error", "Ha ocurrido un error, intente nuevamente.")
         this.activeModal.dismiss('Error')
      }
    )

  }

  Cerrar(){
    this.activeModal.dismiss('NOK')
  }

  

}
