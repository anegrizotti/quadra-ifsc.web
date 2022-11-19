import { Component, OnInit } from '@angular/core';
import axios from 'axios';
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
  public materiais: any;

  constructor(
    private reservaService: ReservaService,
    private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.reservas$ = this.reservaService.selecionarTodos(),
    this.usuarioLogado = this.usuarioService.usuarioLogado;
    this.materiais = obterDadosJson();
  }
}

async function obterDadosJson() {
  try {
    const resposta = await axios.get(`https://apiequipamentos.herokuapp.com/equipamento`, { responseType: "json" })

    carregarMateriais(resposta.data);

  } catch (err) {
    console.log(err);
  }


async function carregarMateriais(dados: any) {
    try {
      const material = document.getElementById("quantidadeTotal") as HTMLLabelElement;
      material.textContent = `Quantidade Total: ${dados[0].quantidadeTotal}`;

      const qntDisponivel = document.getElementById("quantidadeDisponivel") as HTMLLabelElement;
      qntDisponivel.textContent = `Quantidade Disponível: ${dados[0].quantidadeDisponivel}`;

    } catch (err) {
      console.log(err);
    }
  }
}
