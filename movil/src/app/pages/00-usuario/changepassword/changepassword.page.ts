import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ResetPassword } from '../../../models/login';
import { checkMatchValidator } from '../../../models/Validators/CheckString';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})
export class ChangepasswordPage implements OnInit {
  resetPassword = new ResetPassword()
  passwordUpdateForm: FormGroup
  Guardo = false;
  constructor(
    formBuilder: FormBuilder,
    private userService: UserService,
    public toastController: ToastController,
  ) {
    this.passwordUpdateForm = formBuilder.group({
      old_password: ['', Validators.required],
      password: ['', Validators.required],
      password_confirm: [''],
    },
      {
        validator: this.checkPasswords
      }
    );

  }


  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 4000,
      position: 'top',
    });
    toast.present();
  }
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('password').value;
    let confirmPass = group.get('password_confirm').value;

    return pass === confirmPass ? null : { notSame: true }
  }
  ngOnInit() {
  }

  Actualizar() {
    this.userService.updatePassword(this.resetPassword).subscribe(
      OK => {
        this.Guardo = true;
      },
      ERROR => {
        this.presentToast("Por favor verifica los datos e intenta nuevamente.")
      },
    )
  }

}
