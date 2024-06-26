import { Component, OnInit } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { PageStateService } from './page-state.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, RouterModule],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private pageStateService: PageStateService
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // 當路由變化結束時檢查路徑
        if (event.url === '/') {
          localStorage.removeItem('savedTabs');
          this.clearPageStateByPrefix('pageState_');
        }
      }
    });
  }

  // 清除 localStorage 中所有以指定前綴開頭的項目
  private clearPageStateByPrefix(prefix: string): void {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith(prefix)) {
        localStorage.removeItem(key);
      }
    });
  }
}
