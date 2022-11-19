import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import axios from 'axios';
import { debug } from 'console';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';
import { AutenticarUsuarioViewModel } from '../view-models/autenticar-usuario.view-model';
import { TokenViewModel } from '../view-models/token.view-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public tempo: any;

  public loginVM: AutenticarUsuarioViewModel;

  constructor(
    titulo: Title,
    private fb: FormBuilder,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    titulo.setTitle('Login - e-Agenda');
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    })

    this.tempo = obterDadosJson();
  }

  get email() {
    return this.form.get('email');
  }

  get senha() {
    return this.form.get('senha');
  }

  public login() {
    if (this.form.invalid) return;

    this.loginVM = Object.assign({}, this.loginVM, this.form.value);

    this.authService.login(this.loginVM).subscribe({
      // método caso o login seja realizado com sucesso
      next: (loginRealizado) => this.processarSucesso(loginRealizado),

      // método caso haja uma falha na resposta
      error: (erro) => this.processarErro(erro)
    })
  }

  private processarSucesso(loginRealizado: TokenViewModel) {
    this.localStorageService.salvarDadosLocaisUsuario(loginRealizado);
    this.usuarioService.logarUsuario(loginRealizado.usuarioToken);
    this.router.navigate(['/dashboard']);
  }

  private processarErro(erro: any) {
    console.log(erro);
  }
}

async function obterDadosJson() {
  try {
    const resposta = await axios.get(`https://weather.contrateumdev.com.br/api/weather/city/?city=Lages`, { responseType: "json" });
    carregarTemperaturaETempo(resposta.data);

  } catch (err) {
    console.log(err);
  }

  async function carregarTemperaturaETempo(dados: any) {
    try {
      const temperatura = document.getElementById("temperatura") as HTMLLabelElement;
      temperatura.textContent = `Cidade: ${dados.name}`;

      const tempMin = document.getElementById("tempMin") as HTMLLabelElement;
      tempMin.textContent = `Temperatura Mínima: ${dados.main.temp_min}°`;

      const tempMax = document.getElementById("tempMax") as HTMLLabelElement;
      tempMax.textContent = `Temperatura Máxima: ${dados.main.temp_max}°`;

      const sensacao = document.getElementById("sensacao") as HTMLLabelElement;
      sensacao.textContent = `Sensação Térmica: ${dados.main.feels_like}°`;

      const descricao = document.getElementById("descricao") as HTMLLabelElement;
      descricao.textContent = `Descrição: ${dados.weather[0].description}`;

    } catch (err) {
      console.log(err);
    }
  }
}
