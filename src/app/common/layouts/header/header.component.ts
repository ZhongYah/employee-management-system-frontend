import {Component, EventEmitter, Output} from '@angular/core'
import {SharedModule} from '../../shared/shared.module'
import {MenuComponent} from '../menu/menu.component'
import {LogoutComponent} from '../logout/logout.component'
import {AuthService} from '../../auth/auth.service'
import {Router} from '@angular/router'
import {CalendarService} from '../../../pages/calendar/service/calendar.service'

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [SharedModule, MenuComponent, LogoutComponent],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
})
export class HeaderComponent {
    @Output() toggleCollapsed = new EventEmitter<void>()

    constructor(
        private authService: AuthService,
        private router: Router,
        private calendarService: CalendarService
    ) {}

    onToggleCollapsed() {
        // 觸發事件
        this.toggleCollapsed.emit()

        // 檢查當前路由是否為 /calendar，並根據結果刷新頁面
        if (this.router.url === '/calendar') {
            this.calendarService.triggerRefresh() // 通知 CalendarComponent 刷新日曆
        }
    }

    logout(): void {
        this.authService.logout()
    }
}
