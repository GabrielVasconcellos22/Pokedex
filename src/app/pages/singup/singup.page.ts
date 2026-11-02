import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.page.html',
  styleUrls: ['./singup.page.scss'],
})
export class SingupPage implements OnInit {
  regForm: FormGroup;
  // ccia: string = '';

  constructor(
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public authService: AuthService,
    public router: Router,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'),
        ],
      ],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$')]],
    });
  }

  get errorControl() {
    return this.regForm.controls;
  }

  async signUp() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    console.log('Form Valid: ', this.regForm.valid); // Adiciona isso para depuração
    if (this.regForm.valid) {
      try {
        const user = await this.authService.registerUser(
          this.regForm.value.email,
          this.regForm.value.password
        );
        console.log('User: ', user); // Adiciona isso para depuração
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: 'Usuário cadastrado com sucesso.',
          duration: 4000, // duração da mensagem toast em milissegundos
        });
        toast.present();
        this.router.navigate(['/login']);
      } catch (error) {
        console.error('Registration Error: ', error); // Adiciona isso para depuração
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: 'Este e-mail já está cadastrado.',
          duration: 4000, // duração da mensagem toast em milissegundos
        });
        toast.present();
      }
    } else {
      console.warn('Form is not valid'); // Adiciona isso para depuração
      await loading.dismiss();
      const toast = await this.toastController.create({
        message: 'Cadastro não realizado, preencha os campos corretamente.',
        duration: 4000, // duração da mensagem toast em milissegundos
      });
      toast.present();
    }
  }
}
