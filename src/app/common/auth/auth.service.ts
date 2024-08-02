import {Injectable} from '@angular/core'
import {MatDialog} from '@angular/material/dialog'
import {NavigationEnd, Router} from '@angular/router'
import {timer, Subscription} from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private logoutTimerSubscription: Subscription | null = null

    constructor(private router: Router, private dialog: MatDialog) {}

    startLogoutCountdown(duration: number): void {
        this.clearLogoutCountdown() // 清除之前的計時器
        this.logoutTimerSubscription = timer(duration).subscribe(() => {
            this.autoLogout()
        })
    }

    clearLogoutCountdown(): void {
        if (this.logoutTimerSubscription) {
            this.logoutTimerSubscription.unsubscribe()
            this.logoutTimerSubscription = null
        }
    }

    logout(): void {
        // 清除 token 或任何登出邏輯
        // localStorage.removeItem('authToken');
        this.router.navigate(['/login']) // 導航到登錄頁面
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                // 當路由變化結束時檢查路徑
                if (event.url === '/login') {
                    // 調用清除 localStorage的函式
                    this.clearLocalStorageItems()
                }
            }
        })
    }

    autoLogout(): void {
        const handleLogout = () => {
            this.dialog.closeAll() // 關閉所有畫面的燈箱
            this.router.navigate(['/login']) // 導航到登錄頁面
            this.clearLocalStorageItems() // 清除 localStorage 的項目
        }

        // 彈出提示訊息
        if (window.confirm('提醒您，您已被系統登出！')) {
            handleLogout()
        } else {
            // 添加事件監聽器以偵測使用者的畫面動作
            const handleUserInteraction = () => {
                handleLogout()
                // 移除事件監聽器
                document.removeEventListener('click', handleUserInteraction)
                document.removeEventListener('keydown', handleUserInteraction)
            }

            // 添加點擊和鍵盤事件監聽器
            document.addEventListener('click', handleUserInteraction)
            document.addEventListener('keydown', handleUserInteraction)
        }
    }

    // 清除 localStorage的函式
    clearLocalStorageItems() {
        const itemsToRemove = ['savedTabs', 'isCollapsed']
        itemsToRemove.forEach((item) => localStorage.removeItem(item))
    }
}
