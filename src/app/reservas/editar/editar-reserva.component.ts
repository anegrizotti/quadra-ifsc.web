import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservaService } from '../services/reserva.service';
import { FormsReservaViewModel } from '../view-models/forms-reserva.view-model';

@Component({
  selector: 'app-editar-reserva',
  templateUrl: './editar-reserva.component.html',
  styles: [
  ]
})

export class EditarReservaComponent implements OnInit {
  public formReserva: FormGroup;

  public reservaFormVM: FormsReservaViewModel = new FormsReservaViewModel();

  constructor(
    titulo: Title,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private reservaService: ReservaService
  ) {
    titulo.setTitle('Editar Reserva - Quadra IFSC');
  }

  ngOnInit(): void {
    this.reservaFormVM = this.route.snapshot.data['reserva'];

    this.formReserva = this.fb.group({
      data: ['', [Validators.required]],
      horaInicio: ['', [Validators.required]],
      horaTermino: ['', [Validators.required]]
    });

    this.formReserva.patchValue({
      id: this.reservaFormVM.id,
      data: this.reservaFormVM.data.toString().split('T')[0],
      horaInicio: this.reservaFormVM.horaInicio,
      horaTermino: this.reservaFormVM.horaTermino
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


    this.reservaService.editar(this.reservaFormVM)
      .subscribe({
        next: (reservaEditada) => this.processarSucesso(reservaEditada),
        error: (erro) => this.processarFalha(erro)
      });
  }

  private processarSucesso(tarefa: FormsReservaViewModel) {
    this.router.navigate(['/reservas/listar']);
  }

  private processarFalha(erro: any) {
    console.log(erro);
  }

}
