import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioTokenViewModel } from 'src/app/auth/view-models/token.view-model';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { ReservaService } from '../services/reserva.service';
import { ListarReservaViewModel } from '../view-models/listar-reserva.view-model';

@Component({
  selector: 'app-listar-reserva',
  templateUrl: './listar-reserva.component.html'
})

export class ListarReservaComponent implements OnInit {
  public reservas$: Observable<ListarReservaViewModel[]>;
  public usuarioLogado: Observable<UsuarioTokenViewModel | null>;

  constructor(
    private reservaService: ReservaService,
    private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    debugger
    this.reservas$ = this.reservaService.selecionarTodos(),
    this.usuarioLogado = this.usuarioService.usuarioLogado;
  }

}
