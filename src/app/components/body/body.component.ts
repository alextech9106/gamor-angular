import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {NgClass, NgOptimizedImage, NgStyle} from "@angular/common";
import {ThemeService} from "@services/theme/theme.service";
import {ObservableDestroy} from "@classes/observable-destroy/observable-destroy";
import {Router, RouterLink} from "@angular/router";
import {Game} from "@interfaces/game.interface";
import {GamesService} from "@services/games/games.service";
import {PlayersService} from "@services/players/players.service";
import {Player, PlayerPlatform} from "@interfaces/player.interface";
import {ReactiveFormsModule, UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import Cookies from "js-cookie";

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgClass,
    RouterLink,
    ReactiveFormsModule,
    NgStyle
  ],
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss'
})
export class BodyComponent implements OnInit {
  private _buttons = document.getElementsByName('button-group');
  private _gamesService: GamesService = inject(GamesService);
  private _playersService: PlayersService = inject(PlayersService);
  private _themeService: ThemeService = inject(ThemeService);
  private _router: Router = inject(Router);

  protected blackButtonStyle: string = 'background: url(assets/images/tune_black.png) no-repeat; background-size: 24px; background-position: right 2rem center;';
  protected whiteButtonStyle: string = 'background: url(assets/images/tune_white.png) no-repeat; background-size: 24px; background-position: right 2rem center;';

  public theme: WritableSignal<string> = signal('');
  public time: WritableSignal<string> = signal('');
  public games: WritableSignal<Game[]> = signal([]);
  public players: WritableSignal<Player[]> = signal([]);
  public onParty: WritableSignal<Player[]> = signal([]);
  public user: string | undefined = Cookies.get('auth');

  public searchForm: UntypedFormGroup = new UntypedFormGroup({
    search: new UntypedFormControl({value: '', disabled: false})
  });

  public selectedPlatform: WritableSignal<PlayerPlatform> = signal(PlayerPlatform.PARTY);

  private _setTime(): void {
    const hours: number = new Date().getHours();
    const minutes: number = new Date().getMinutes();
    const seconds: number = new Date().getSeconds();

    this.time.set(
      (hours < 10 ? "0" + hours.toString() : hours.toString()) + " : " +
      (minutes < 10 ? "0" + minutes.toString() : minutes.toString()) + " : " +
      (seconds < 10 ? "0" + seconds.toString() : seconds.toString())
    );
  }

  private _getGames(): void {
    this._gamesService.getGames()
      .pipe(ObservableDestroy.unregisterFn())
      .subscribe({
        next: (games: Game[]): void => {
          this.games.set(games);
        },
        error: (error): void => {
          console.error(error);
        }
      });
  }

  public onSelected(id: string): void {
    this._buttons.forEach((button: HTMLElement): void => {
      button?.removeAttribute('class');
    });

    const element: HTMLElement | null = document.getElementById(id);
    element?.setAttribute('class', 'selected');

    this.selectedPlatform.set(element?.textContent as PlayerPlatform);
  }

  public getPlayersByParams(): void {
    this.onParty.set([]);

    this._playersService.getPlayersByParams(this.selectedPlatform(), this.searchForm.controls['search']?.value)
      .pipe(ObservableDestroy.unregisterFn())
      .subscribe({
        next: (players: Player[]): void => {
          this.players.set(players);
        },
        error: (error): void => {
          console.error(error);
        }
      });
  }

  public addToParty(player: Player): void {
    if (Cookies.get('auth')) {
      this.players.update((players: Player[]): Player[] => {
        players.forEach((p: Player): void => {
          if (p.id === player.id) {
            p.joined = true;
          }
        });

        return players;
      });

      this.onParty().push(player);
    } else {
      this._router.navigate(['sign-in']).then();
    }
  }

  ngOnInit(): void {
    this._themeService.theme$
      .pipe(ObservableDestroy.unregisterFn())
      .subscribe({
        next: (theme: string): void => {
          this.theme.set(theme);

          const selectElement: HTMLElement | null = document.getElementById('select');

          if (this.theme() === 'light') {
            selectElement?.setAttribute('style', this.blackButtonStyle);
          } else {
            selectElement?.setAttribute('style', this.whiteButtonStyle);
          }
        }
      });

    this._getGames();

    setInterval((): void => {
      this._setTime();
    }, 1000);
  }
}
