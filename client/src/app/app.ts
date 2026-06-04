import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PermutationsPageComponent } from './features/permutations/pages/permutation-page/permutation-page';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PermutationsPageComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('client');
}
