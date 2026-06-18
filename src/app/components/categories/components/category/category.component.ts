import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {Category} from "@interfaces/category.interface";
import {NgOptimizedImage} from "@angular/common";
import {ObservableDestroy} from "@classes/observable-destroy/observable-destroy";
import {ThemeService} from "@services/theme/theme.service";

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
  inputs: ['category']
})
export class CategoryComponent implements OnInit {
  private _themeService: ThemeService = inject(ThemeService);

  public category: Category = {} as Category;
  public theme: WritableSignal<string> = signal('');

  ngOnInit() {
    this._themeService.theme$
      .pipe(ObservableDestroy.unregisterFn())
      .subscribe({
        next: (theme: string): void => {
          this.theme.set(theme);
        }
      });
  }
}
