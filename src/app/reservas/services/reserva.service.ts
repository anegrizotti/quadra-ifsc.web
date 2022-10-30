import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";
import { LocalStorageService } from "src/app/auth/services/local-storage.service";
import { environment } from "src/environments/environment";
import { FormsReservaViewModel } from "../view-models/forms-reserva.view-model";
import { ListarReservaViewModel } from "../view-models/listar-reserva.view-model";
import { VisualizarReservaViewModel } from "../view-models/visualizar-reserva.view-model";

@Injectable()
export class ReservaService {
  private apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  public inserir(reserva: FormsReservaViewModel): Observable<FormsReservaViewModel> {
    const resposta = this.http
      .post<FormsReservaViewModel>(this.apiUrl + 'reservas', reserva, this.obterHeadersAutorizacao())
      .pipe(map(this.processarDados), catchError(this.processarFalha));

    return resposta;
  }

  public editar(reserva: FormsReservaViewModel): Observable<FormsReservaViewModel> {
    const resposta = this.http
      .put<FormsReservaViewModel>(this.apiUrl + 'reservas/' + reserva.id, reserva, this.obterHeadersAutorizacao())
      .pipe(map(this.processarDados), catchError(this.processarFalha));

    return resposta;
  }

  public excluir(id: string): Observable<string> {
    const resposta = this.http
      .delete<string>(this.apiUrl + 'reservas/' + id, this.obterHeadersAutorizacao())
      .pipe(map(this.processarDados), catchError(this.processarFalha));

    return resposta;
  }

  public selecionarTodos(): Observable<ListarReservaViewModel[]> {
    const resposta = this.http
      .get<ListarReservaViewModel[]>(this.apiUrl + 'reservas', this.obterHeadersAutorizacao())
      .pipe(map(this.processarDados), catchError(this.processarFalha));

    return resposta;
  }

  public selecionarPorId(id: string): Observable<FormsReservaViewModel> {
    const resposta = this.http
      .get<FormsReservaViewModel>(this.apiUrl + 'reservas/' + id, this.obterHeadersAutorizacao())
      .pipe(map(this.processarDados), catchError(this.processarFalha));

    return resposta;
  }

  public selecionarReservaCompletaPorId(id: string): Observable<VisualizarReservaViewModel> {
    const resposta = this.http
      .get<VisualizarReservaViewModel>(this.apiUrl + 'reservas/visualizacao-completa/' + id, this.obterHeadersAutorizacao())
      .pipe(map(this.processarDados), catchError(this.processarFalha));

    return resposta;
  }

  private obterHeadersAutorizacao() {
    const token = this.localStorageService.obterTokenUsuario();

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    }
  }


  private processarDados(resposta: any) {
    if (resposta?.sucesso)
      return resposta.dados;
    else
      return resposta;
  }

  private processarFalha(resposta: any) {
    console.log(resposta);
    return throwError(() => new Error(resposta.error.erros[0]));
  }
}
