import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {signInEndpoint} from "@constants/endpoints";
import {SignIn} from "@interfaces/signIn.interface";
import Cookies from "js-cookie";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _http: HttpClient = inject(HttpClient);

  public user$: BehaviorSubject<string> = new BehaviorSubject<string>(Cookies.get('auth') ?? '');

  public setUser(user: string): void {
    this.user$.next(user);
  }

  public signIn(email: string, password: string): Observable<SignIn> {
    const body: SignIn = {
      email: email,
      password: btoa(password)
    };

    return this._http.post<SignIn>(signInEndpoint, body);
  }
}
