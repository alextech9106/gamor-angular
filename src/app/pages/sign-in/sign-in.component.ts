import {Component, inject} from '@angular/core';
import {ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {EMAIL_REGEXP} from "@constants/regexps";
import {AuthService} from "@services/auth/auth.service";
import {ObservableDestroy} from "@classes/observable-destroy/observable-destroy";
import Cookies from "js-cookie";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  private _authService: AuthService = inject(AuthService);
  private _toastService: ToastrService = inject(ToastrService);
  private _router: Router = inject(Router);

  public form: UntypedFormGroup = new UntypedFormGroup({
    email: new UntypedFormControl({
      value: '',
      disabled: false
    }, [Validators.required, Validators.pattern(EMAIL_REGEXP), Validators.email]),
    password: new UntypedFormControl({value: '', disabled: false}, [Validators.required])
  });

  public signIn(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.form.markAsDirty();
    } else {
      this._authService.signIn(this.form.controls['email']?.value, this.form.controls['password']?.value)
        .pipe(ObservableDestroy.unregisterFn())
        .subscribe({
          next: (user): void => {
            Cookies.set('auth', user.accessToken);
            this._authService.setUser(user.accessToken);
            this._toastService.info('User signed in successfully', 'Success');
            this._router.navigate(['home']).then();
          },
          error: (error): void => {
            this._toastService.error(error?.error?.message, 'Error');
          }
        });
    }
  }
}
