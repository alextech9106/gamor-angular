import {Component, signal, WritableSignal} from '@angular/core';
import {Category} from "@interfaces/category.interface";
import {CategoryComponent} from "@components/categories/components/category/category.component";

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CategoryComponent
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  public categories: WritableSignal<Category[]> = signal([
    {
      id: '01',
      name: 'Action Games',
      image: 'assets/images/action_games.jpg'
    },
    {
      id: '02',
      name: 'Sport Games',
      image: 'assets/images/sport_games.jpg'
    },
    {
      id: '03',
      name: 'Adventure Games',
      image: 'assets/images/adventure_games.jpg'
    },
    {
      id: '04',
      name: 'Arcade Games',
      image: 'assets/images/arcade_games.jpg'
    },
    {
      id: '05',
      name: 'Fantasy Games',
      image: 'assets/images/fantasy_games.jpg'
    },
    {
      id: '06',
      name: 'Strategy Games',
      image: 'assets/images/strategy_games.jpg'
    },
    {
      id: '07',
      name: 'Shooter Games',
      image: 'assets/images/shooter_games.jpg'
    },
    {
      id: 'VIEW ALL',
      name: 'All Categories',
      image: 'assets/images/all_games.jpg'
    }
  ]);
}
