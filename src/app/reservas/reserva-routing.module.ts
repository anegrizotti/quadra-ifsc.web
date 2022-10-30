import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/services/auth.guard';
import { ReservaAppComponent } from './reserva-app.component';
import { ListarReservaComponent } from './listar/listar-reserva.component';
import { InserirReservaComponent } from './inserir/inserir-reserva.component';
import { EditarReservaComponent } from './editar/editar-reserva.component';
import { FormsReservaResolver } from './services/forms-reserva.resolver';
import { ExcluirReservaComponent } from './excluir/excluir-reserva.component';
import { VisualizarReservaResolver } from './services/visualizar-reserva.resolver';

const routes: Routes = [
  {
    path: '', component: ReservaAppComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'listar', pathMatch: 'full' },
      { path: 'listar', component: ListarReservaComponent },
      { path: 'inserir', component: InserirReservaComponent },
      {
        path: 'editar/:id',
        component: EditarReservaComponent,
        resolve: { reserva: FormsReservaResolver }
      },
      {
        path: 'excluir/:id',
        component: ExcluirReservaComponent,
        resolve: { contato: VisualizarReservaResolver }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservaRoutingModule { }
