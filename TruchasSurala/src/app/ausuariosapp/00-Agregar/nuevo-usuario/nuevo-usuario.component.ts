import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../models/users';
import { Select } from '../../../models/Datos.generales';
import { UsuarioappService } from '../../../service/usuarioapp/usuarioapp.service';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css']
})
export class NuevoUsuarioComponent implements OnInit {
  formgroup: FormGroup;
  activo: string;
  NuevoNombre: string;
  nuevoUsuario = new User();
  public mail: boolean;
  public identificacion: boolean;
  tiposIdentificacion: Select[] = [
    { value: '1', viewValue: 'CC' },
    { value: '2', viewValue: 'NIT' }

  ]
  constructor(
    private _formBuilder: FormBuilder,
    private service: UsuarioappService
  ) { }

  ngOnInit(): void {
    this.formgroup = this._formBuilder.group({

      nombre: ['', Validators.required],
      apellidos: ['', Validators.nullValidator],

      TipoIden: ['', Validators.required],
      NumeroIden: ['', Validators.required],
      rol: ['', Validators.required],
      Email: ['', Validators.required],








    })
  }


  onGuardar() {

    this.service.guardarUsuarioSuarala(this.nuevoUsuario).subscribe(
      OK => {
        console.log(OK)
        if (OK.code == 200 && OK.status == 'success') {
          this.service.Exitoso();
          this.formgroup.reset()
          this.nuevoUsuario = new User();


        } else {
          let errores = "";
          if (OK.errors != null) {

            if (OK.errors.email != null) {
              this.mail = true;
              errores += "Validar el Email."
            }
            if (OK.errors.numero_identificacion != null) {
              this.identificacion = true;
              errores += "Validar el Número de identificación."

            }
          }


          this.service.NoExitoso("Validación de datos", "Valida los datos ingresados: " + errores)
        }
      },
      ERROR => {
        this.service.NoExitosoComun()
        console.log(ERROR)

      },
    )

  }

}
