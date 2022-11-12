import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarReservaComponent } from './listar/listar-reserva.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReservaService } from './services/reserva.service';
import { FormsReservaResolver } from './services/forms-reserva.resolver';
import { VisualizarReservaResolver } from './services/visualizar-reserva.resolver';
import { ReservaRoutingModule } from './reserva-routing.module';
import { RouterModule } from '@angular/router';
import { ReservaAppComponent } from './reserva-app.component';
import { InserirReservaComponent } from './inserir/inserir-reserva.component';
import { EditarReservaComponent } from './editar/editar-reserva.component';
import { ExcluirReservaComponent } from './excluir/excluir-reserva.component';



@NgModule({
  declarations: [
    ReservaAppComponent,
    ListarReservaComponent,
    EditarReservaComponent,
    ExcluirReservaComponent,
    InserirReservaComponent,
  ],
  imports: [
    CommonModule,
    ReservaRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    RouterModule
  ],
  providers: [ReservaService, FormsReservaResolver, VisualizarReservaResolver]
})
export class ReservaModule { }
