import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ReservaService } from '../services/reserva.service';
import { ListarReservaViewModel } from '../view-models/listar-reserva.view-model';

@Component({
  selector: 'app-listar-reserva',
  templateUrl: './listar-reserva.component.html'
})

export class ListarReservaComponent implements OnInit {
  public reservas$: Observable<ListarReservaViewModel[]>;

  constructor(private reservaService: ReservaService) { }

  ngOnInit(): void {
    this.reservas$ = this.reservaService.selecionarTodos();
  }
}
