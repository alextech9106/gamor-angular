import {DestroyRef, inject, Injectable} from "@angular/core";
import {MonoTypeOperatorFunction, Subject, takeUntil} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ObservableDestroy {
  constructor() {
    inject(DestroyRef).onDestroy(() => {
      ObservableDestroy.observableSubject$.next();
      ObservableDestroy.observableSubject$.complete();
    });
  }

  private static observableSubject$: Subject<void> = new Subject();

  public static unregisterFn(): MonoTypeOperatorFunction<any> {
    return takeUntil(ObservableDestroy.observableSubject$.asObservable());
  }
}
