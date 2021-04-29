import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateUser } from 'src/app/models/update.pass';
import { UserService } from '../../../../service/user/user.service';
import { Select } from '../../../../models/Datos.generales';

@Component({
  selector: 'app-perfil-update',
  templateUrl: './perfil-update.component.html',
  styleUrls: ['./perfil-update.component.css']
})
export class PerfilUpdateComponent implements OnInit {

  PerfilesUusuarios: Select[] = [
    { value: 'OVAS', viewValue: 'OVAS' },
    { value: 'ALEVINOS', viewValue: 'ALEVINOS' },
    { value: 'AMBOS', viewValue: 'AMBOS' },
  ]

  PerfilesSurala: Select[] = [
    { value: 'OVAS', viewValue: 'OVAS' },
    { value: 'ALEVINOS', viewValue: 'ALEVINOS' },
    { value: 'TECNICO', viewValue: 'ASESOR TÉCNICO' },
    { value: 'CONDUCTOR', viewValue: 'CONDUCTOR' },

  ]

  perfilMostrar: Select[] = [];
  firstFormGroup: FormGroup;
  mailFormGroup: FormGroup;


  @Input() idUsuario: number;
  @Input() perfil: string;
  @Input() correo: string;

  @Input() Esperfil: boolean;



  @Input() set usuarioNumero(value: number) {
    this.idUsuario = value;

  }
  mostrar: boolean = false;
  usuario: UpdateUser;
  constructor(
    private userService: UserService,
    private _formBuilder: FormBuilder,
    public activeModal: NgbActiveModal

  ) { }

  ngOnInit(): void {

    this.perfilMostrar = []
    this.perfilMostrar = this.PerfilesUusuarios.filter(item =>
      item.value != this.perfil);

    this.firstFormGroup = this._formBuilder.group({
      perfil: ['', Validators.required],


    });

    this.mailFormGroup = this._formBuilder.group({
      Email: ['', [Validators.required, Validators.email]],


    });
    this.usuario = new UpdateUser();
    this.usuario.id = this.idUsuario;
    this.usuario.password = '';


  }

  cambiarPassword() {
    console.log(this.usuario);
    if (this.Esperfil) {
      this.userService.changePerfilUser(this.usuario).subscribe(
        ok => {
          {
            this.activeModal.close("OK")

          }
        },
        error => {
          this.userService.registroNoExitoso("Error", "Ha ocurrido un error, intente nuevamente.")
          this.activeModal.dismiss('Error')
        }
      )
    } else {
      this.userService.changePmailUser(this.usuario).subscribe(
        ok => {
          {
            if(ok.code==200){

              this.activeModal.close("OK")
            }else if (ok.code==201){
              this.userService.registroNoExitoso("Error", "El email ingresado ya existe.")

            }
          }
        },
        error => {
          this.userService.registroNoExitoso("Error", "Ha ocurrido un error, intente nuevamente.")
          this.activeModal.dismiss('Error')
        }
      )
    }


  }



  Cerrar() {
    this.activeModal.dismiss('NOK')
  }


}
