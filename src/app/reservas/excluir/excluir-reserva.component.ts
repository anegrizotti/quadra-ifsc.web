import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservaService } from '../services/reserva.service';
import { VisualizarReservaViewModel } from '../view-models/visualizar-reserva.view-model';

@Component({
  selector: 'app-excluir-reserva',
  templateUrl: './excluir-reserva.component.html',
  styles: [
  ]
})
export class ExcluirReservaComponent implements OnInit {

  public reservaFormVM: VisualizarReservaViewModel = new VisualizarReservaViewModel();

  constructor(
    titulo: Title,
    private route: ActivatedRoute,
    private router: Router,
    private reservaService: ReservaService
  ) {
    titulo.setTitle('Excluir Reserva - Quadra IFSC');
  }

  ngOnInit(): void {
    this.reservaFormVM = this.route.snapshot.data['reserva'];
  }

  public gravar() {
    debugger
    this.reservaService.excluir(this.reservaFormVM.id)

      .subscribe({
        next: (reservaId) => this.processarSucesso(reservaId),
        error: (erro) => this.processarFalha(erro)
      })
      console.log(this.reservaFormVM.id);
  }

  private processarSucesso(reservaId: string): void {
    this.router.navigate(['/reservas/listar']);
  }

  private processarFalha(erro: any) {
    if (erro) {
      console.error(erro);
    }
  }

}
