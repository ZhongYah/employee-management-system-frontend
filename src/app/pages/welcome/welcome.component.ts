import {Component, TemplateRef, ViewChild} from '@angular/core'
import {SharedModule} from '../../common/shared/shared.module'
import {ButtonComponent} from '../../common/components/button/button.component'
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import {ModalComponent} from '../../common/components/modal/modal.component'

@Component({
    selector: 'app-welcome',
    standalone: true,
    templateUrl: './welcome.component.html',
    styleUrl: './welcome.component.scss',
    imports: [SharedModule, ButtonComponent],
})
export class WelcomeComponent {
    @ViewChild('contentTemplate', {static: true})
    contentTemplate!: TemplateRef<any>

    items_1: any[] = []
    items_2: any[] = []

    constructor(public dialog: MatDialog) {
        const originalData_1 = {
            isChecked: true,
            info: '【提醒】員工旅遊補助申請到期提醒, 尚有 1 筆 員工旅遊補助到期尚未送出核銷旅費。',
        }

        const originalData_2 = {
            date: '2024/06/20',
            info: '【公告】這是測試公告。測試佈局和樣式效果。我們需要確保文字能正確換行，並且在不同裝置上都能正常顯示。這個公告的目的是驗證文字長度對頁面佈局的影響。',
            unit: '資訊室',
        }

        for (let i = 0; i < 3; i++) {
            const newData = {...originalData_1}
            this.items_1.push(newData)
        }

        for (let i = 0; i < 5; i++) {
            const newData = {...originalData_2}
            this.items_2.push(newData)
        }
    }

    getInfoWithLink(info: string): string {
        const numberMatch = info.match(/\d+/)

        if (numberMatch) {
            const number = numberMatch[0]
            return info.replace(number, `<a class="modal-link">${number}</a>`)
        }

        return info
    }
    ngOnInit() {}

    saveData(key: string, value: any): void {
        console.log(`Saving data for key: ${key}, value: ${value}`)
    }

    openModal(title: string, info: string, contentTemplate: any): void {
        this.dialog.open(ModalComponent, {
            width: '600px',
            height: '500px',
            data: {
                title: `${title}`,
                content: `${info}`,
                contentTemplate: contentTemplate,
                button: '關閉視窗',
            },
        })
    }

    handleModalLinkClick(): void {
        this.openModal('待簽核表單標題', '待簽核表單內容', this.contentTemplate)
    }
}
