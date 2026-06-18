import {inject, Injectable} from '@angular/core';
import {getGamesEndpoint} from "@constants/endpoints";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Game} from "@interfaces/game.interface";

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private _http: HttpClient = inject(HttpClient);

  public getGames(): Observable<Game[]> {
    return this._http.get<Game[]>(getGamesEndpoint);
  }
}
