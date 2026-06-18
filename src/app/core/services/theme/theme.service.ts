import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {themeKey} from "@constants/storage-keys";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public theme$: BehaviorSubject<string> = new BehaviorSubject<string>(localStorage.getItem(themeKey) ?? 'light');

  public setTheme(theme: string): void {
    this.theme$.next(theme);
  }
}
