import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/permutations/routes')
        .then(r => r.PERMUTATIONS_ROUTES)
  },
];