import {Component, EventEmitter, OnInit, Output} from '@angular/core'
import {SharedModule} from '../../../../common/shared/shared.module'
import {ButtonComponent} from '../../../../common/components/button/button.component'
import {SelectComponent} from '../../../../common/components/select/select.component'
import {PageStateService} from '../../../../page-state.service'
import {Hr110BoardInterface} from '../service/hr110-board-interface'

@Component({
    selector: 'app-hr110-board',
    standalone: true,
    templateUrl: './hr110-board.component.html',
    styleUrl: './hr110-board.component.scss',
    imports: [SharedModule, ButtonComponent, SelectComponent],
})
export class Hr110BoardComponent implements OnInit {
    @Output() showInformKeyChange = new EventEmitter<string>()

    /* 注入 共用儲存狀態的Service */
    constructor(private pageStateService: PageStateService) {}

    /* 控制表單欄位狀態 */
    formState: Hr110BoardInterface = {
        showInformKey: {value: ''}, // 要顯示哪個查詢結果的參數
        optionSelected_0: {value: ''}, // 管理員
    }

    /* 初始化的函式 */
    ngOnInit() {
        const pageStateKeys: Array<keyof Hr110BoardInterface> = [
            'optionSelected_0',
        ]

        pageStateKeys.forEach((key) => {
            this.formState[key].value =
                this.pageStateService.getPageState(key) ?? ''
        })
    }

    /* 管理員選單資料 */
    selectOptions_1 = ['全部', '人資A', '人資B', '人資C']

    /* 控制選擇器的函式 */
    handleSelectChanged(selectOption: string) {
        this.formState.optionSelected_0.value = selectOption
        this.saveData('optionSelected_0', selectOption)
    }

    /* 控制查詢按鈕的函式 */
    handleButtonClick() {
        console.log('Button clicked!')
    }

    /* 控制查詢資料的函式 */
    handleShowInformChanged(eventName: string) {
        switch (eventName) {
            case 'showInform_2': // 已離職
                this.formState.showInformKey.value = '2'
                this.showInformKeyChange.emit(
                    this.formState.showInformKey.value
                )
                break
            case 'showInform_3': // 在職中
                this.formState.showInformKey.value = '3'
                this.showInformKeyChange.emit(
                    this.formState.showInformKey.value
                )
                break
            default:
                console.error('選擇名稱無效。')
        }
    }

    /* 儲存資料的函式 */
    saveData(key: string, value: string): void {
        this.pageStateService.setPageState(key, value)
    }
}
