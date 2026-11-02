
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  email: any;

  constructor(public route: Router, public authService: AuthService, public toastController: ToastController) {}

  ngOnInit() {}

  async resetPassword() {
    this.authService
      .resetPassword(this.email)
      .then(async () => {
        console.log('reset enviado');
        const toast = await this.toastController.create({
          message: 'E-mail de redefinição de senha enviado',
          duration: 4000, // duração da mensagem toast em milissegundos
        });
        toast.present();
        this.route.navigate(['/login']);
      })
      .catch(async (error) => {
        const toast = await this.toastController.create({
          message: 'E-mail não enviado. Por favor, tente novamente.',
          duration: 4000, // duração da mensagem toast em milissegundos
        });
        toast.present();
        console.log(error);
      });
  }
}
