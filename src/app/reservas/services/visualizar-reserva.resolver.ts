import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { VisualizarReservaViewModel } from "../view-models/visualizar-reserva.view-model";
import { ReservaService } from "./reserva.service";

@Injectable()
export class VisualizarReservaResolver implements Resolve<VisualizarReservaViewModel> {

  constructor(private reservaService: ReservaService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<VisualizarReservaViewModel> {
    return this.reservaService.selecionarReservaCompletaPorId(route.params['id']);
  }
}
