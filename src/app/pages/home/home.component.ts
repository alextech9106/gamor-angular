import {Component} from '@angular/core';
import {BodyComponent} from "@components/body/body.component";
import {CategoriesComponent} from "@components/categories/categories.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BodyComponent,
    CategoriesComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
