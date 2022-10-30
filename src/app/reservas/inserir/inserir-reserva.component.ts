import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ReservaService } from '../services/reserva.service';
import { FormsReservaViewModel } from '../view-models/forms-reserva.view-model';

@Component({
  selector: 'app-inserir-reserva',
  templateUrl: './inserir-reserva.component.html'
})

export class InserirReservaComponent implements OnInit {
  public formReserva: FormGroup;

  public reservaFormVM: FormsReservaViewModel = new FormsReservaViewModel();

  constructor(
    titulo: Title,
    private formBuilder: FormBuilder,
    private reservaService: ReservaService,
    private router: Router
  ) {
    titulo.setTitle('Cadastrar Reserva - Quadra IFSC');
  }

  ngOnInit(): void {

    this.formReserva = this.formBuilder.group({
      data: ['', [Validators.required]],
      horaInicio: ['', [Validators.required]],
      horaTermino: ['', [Validators.required]]
    });
  }

  get data() {
    return this.formReserva.get('data');
  }

  get horaInicio() {
    return this.formReserva.get('horaInicio');
  }

  get horaTermino() {
    return this.formReserva.get('horaTermino');
  }

  public gravar() {
    if (this.formReserva.invalid) return;

    this.reservaFormVM = Object.assign({}, this.reservaFormVM, this.formReserva.value);

    this.reservaService.inserir(this.reservaFormVM)
      .subscribe({
        next: (reservaInserido) => this.processarSucesso(reservaInserido),
        error: (erro) => this.processarFalha(erro)
      })
  }

  private processarSucesso(reserva: FormsReservaViewModel): void {
    this.router.navigate(['/reservas/listar']);
  }

  private processarFalha(erro: any) {
    if (erro) {
      console.error(erro);
    }
  }
}
