import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {gePlayersEndpoint} from "@constants/endpoints";
import {Player, PlayerPlatform} from "@interfaces/player.interface";

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  private _http: HttpClient = inject(HttpClient);

  public getPlayersByParams(platform: PlayerPlatform, game: string): Observable<Player[]> {
    const body = {
      platform: platform,
      game: game
    };

    return this._http.get<Player[]>(gePlayersEndpoint, {params: body});
  }
}
