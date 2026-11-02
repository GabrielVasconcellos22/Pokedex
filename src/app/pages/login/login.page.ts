import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  password: any;

  constructor(
    public toastController: ToastController,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public authService: AuthService,
    public router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'),
        ],
      ],
      password: ['', [Validators.required]],
    });
  }

  get errorControl() {
    return this.loginForm.controls;
  }

  async login() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    if (this.loginForm?.valid) {
      const user = await this.authService
        .loginUser(this.loginForm.value.email, this.loginForm.value.password)
        .catch((error) => {
          console.log(error);
          loading.dismiss();
        });
      if (user) {
        const toast = await this.toastController.create({
          message: 'Login realizado com sucesso',
          duration: 4000, // duração da mensagem toast em milissegundos
        });
        toast.present();

        loading.dismiss();
        this.router.navigate(['/pokemon-list']);
      } else {
        console.log('usuario ou senha invalidos');

        const toast = await this.toastController.create({
          message: 'Senha incorreta. Por favor, tente novamente.',
          duration: 4000, // duração da mensagem toast em milissegundos
        });
        toast.present();
      }
    }
  }
}
