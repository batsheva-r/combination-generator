import { Routes } from '@angular/router';

export const PERMUTATIONS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/permutation-page/permutation-page')
        .then(c => c.PermutationsPageComponent)
  }
];