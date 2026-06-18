import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {themeKey} from "@constants/storage-keys";
import {NgOptimizedImage, NgStyle} from "@angular/common";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {ThemeService} from "@services/theme/theme.service";
import Cookies from "js-cookie";
import {User} from "@interfaces/user.interface";
import {AuthService} from "@services/auth/auth.service";
import {ObservableDestroy} from "@classes/observable-destroy/observable-destroy";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    RouterLinkActive,
    NgStyle
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  private _darkTheme: string = 'dark-theme';
  private _selectedTheme: string | null = localStorage.getItem(themeKey);
  private _authService: AuthService = inject(AuthService);
  private _themeService: ThemeService = inject(ThemeService);
  private _router: Router = inject(Router);

  public theme: WritableSignal<string | null> = signal('light');
  public user: WritableSignal<User> = signal({} as User);

  private _decodeJWT(token: string): any {
    const base64Url: string = token?.split('.')[1];
    const base64: string = base64Url?.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload: string = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  public changeTheme(): void {
    if (this.theme() === 'light') {
      this.theme.set('dark');
      localStorage.setItem(themeKey, 'dark');
      document.body.classList.add(this._darkTheme);
      this._themeService.setTheme('dark');
    } else {
      this.theme.set('light');
      localStorage.setItem(themeKey, 'light');
      document.body.classList.remove(this._darkTheme);
      this._themeService.setTheme('light');
    }
  }

  public logOut(): void {
    this.user.set({} as User);
    Cookies.remove('auth');
    this._router.navigate(['sign-in']).then();
  }

  ngOnInit(): void {
    if (!this._selectedTheme) {
      localStorage.setItem(themeKey, this.theme() as string);
    } else {
      document.body.classList[this._selectedTheme === 'dark' ? 'add' : 'remove'](this._darkTheme);
      this.theme.set(this._selectedTheme);
    }

    this._authService.user$
      .pipe(ObservableDestroy.unregisterFn())
      .subscribe({
        next: (user: string): void => {
          this.user.set(this._decodeJWT(user));
        }
      });
  }
}
