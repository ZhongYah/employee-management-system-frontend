import { Routes } from '@angular/router';
import { LayoutComponent } from './common/layouts/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full',
      },
      {
        path: 'welcome',
        loadChildren: () =>
          import('./pages/welcome/welcome.routes').then(
            (m) => m.WELCOME_ROUTES
          ),
        data: { tabName: '首頁' },
      },
      {
        path: 'calendar',
        loadChildren: () =>
          import('./pages/calendar/calendar.routes').then(
            (m) => m.CALENDAR_ROUTES
          ),
        data: { tabName: '行事曆' },
      },
      {
        path: 'hr110',
        loadChildren: () =>
          import('./pages/hr110/hr110.routes').then((m) => m.HR110_ROUTES),
        data: { tabName: '員工資料管理(人資)' },
      },
      // 可以加入其他子路由...
    ],
  },
];
