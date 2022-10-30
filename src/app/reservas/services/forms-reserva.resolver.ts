import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { FormsReservaViewModel } from "../view-models/forms-reserva.view-model";
import { ReservaService } from "./reserva.service";

@Injectable()
export class FormsReservaResolver implements Resolve<FormsReservaViewModel> {

  constructor(private reservaService: ReservaService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<FormsReservaViewModel> {
    return this.reservaService.selecionarPorId(route.params['id']);
  }
}
