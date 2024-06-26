import { Routes } from '@angular/router';

export const HR110_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./list/components/hr110-list.component').then((m) => m.Hr110ListComponent),
  },
]
