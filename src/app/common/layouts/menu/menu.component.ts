import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [SharedModule],
})
export class MenuComponent implements OnInit {
  @Input() isCollapsed = false;
  menuData!: any[];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const data = [
      {
        title: '首頁',
        icon: 'home',
        link: '/welcome',
      },
      {
        title: '行事曆',
        icon: 'calendar',
        link: '/calendar',
      },
      {
        title: '人力管理',
        icon: 'form',
        children: [
          {
            title: '員工資料管理',

            children: [
              { title: '人資', icon: 'team', link: '/hr110' },
              { title: '部門主管', icon: 'user', link: '/hr120' },
            ],
          },
          { title: '部門座位圖', link: '/hr210' },
        ],
      },
    ];

    this.menuData = data;
    this.updateMenuState();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateMenuState();
      });
  }

  updateMenuState(): void {
    let isInMenu = false;
    this.menuData.forEach((menu) => {
      this.checkMenuItemActive(menu);
      if (menu.children) {
        menu.children.forEach((subMenu: any) => {
          this.checkMenuItemActive(subMenu);
          if (subMenu.children) {
            subMenu.children.forEach((subSubMenu: any) => {
              this.checkMenuItemActive(subSubMenu);
            });
          }
        });
      }
    });

    if (!isInMenu) {
      this.isCollapsed = false; // 當前路徑不在選單中時不收合選單
    }
  }

  private checkMenuItemActive(menuItem: any): void {
    menuItem.active = this.router.isActive(menuItem.link, true);
    if (menuItem.active && menuItem.link) {
      this.expandParent(menuItem);
    }
  }

  private expandParent(menuItem: any): void {
    this.menuData.forEach((menu) => {
      if (menu.children) {
        menu.children.forEach((subMenu: any) => {
          if (
            subMenu === menuItem ||
            subMenu.children?.some((subSubMenu: any) => subSubMenu === menuItem)
          ) {
            subMenu.open = true;
            menu.open = true;
          } else if (subMenu.children) {
            subMenu.children.forEach((subSubMenu: any) => {
              if (subSubMenu === menuItem) {
                subMenu.open = true;
                menu.open = true;
              }
            });
          }
        });
      }
    });
  }
}
