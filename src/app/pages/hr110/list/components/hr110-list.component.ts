import {Component, OnInit} from '@angular/core'
import {Router} from '@angular/router'
import {Hr110BoardComponent} from '../../board/components/hr110-board.component'
import {SharedModule} from '../../../../common/shared/shared.module'
import {ButtonComponent} from '../../../../common/components/button/button.component'
import {InputComponent} from '../../../../common/components/input/input.component'
import {SelectComponent} from '../../../../common/components/select/select.component'
import {Hr110List2Component} from '../../list2/components/hr110-list2.component'
import {RouterModule} from '@angular/router'
import {DatePickerComponent} from '../../../../common/components/datePicker/datePicker.component'
import {PageStateService} from '../../../../page-state.service'
import {Hr110ListInterface} from '../service/hr110-list-interface'
import {TabService} from '../../../../common/layouts/tab/tab.service'

@Component({
    selector: 'app-hr110-list',
    standalone: true,
    templateUrl: './hr110-list.component.html',
    styleUrl: './hr110-list.component.scss',
    imports: [
        Hr110BoardComponent,
        SharedModule,
        ButtonComponent,
        InputComponent,
        SelectComponent,
        Hr110List2Component,
        RouterModule,
        DatePickerComponent,
        Hr110List2Component,
    ],
})
export class Hr110ListComponent implements OnInit {
    /* 注入共用Service  */
    constructor(
        private pageStateService: PageStateService, // 儲存狀態的Service
        private tabService: TabService // 關閉tab的Service
    ) {}

    /* 控制表單欄位狀態 */
    formState: Hr110ListInterface = {
        showInformKey: {value: ''}, // 要顯示哪個查詢結果的參數
        showPage: {value: ''}, // 要顯示哪個畫面的參數
        inputText_1: {value: ''}, // 姓名
        inputText_2: {value: ''}, // 身分證字號
        inputText_3: {value: ''}, // 員工編號
        inputText_4: {value: ''}, // 通訊電話
        inputText_5: {value: ''}, // 受僱日期(起日)
        inputText_6: {value: ''}, // 受僱日期(迄日)
        inputText_7: {value: ''}, // 通訊地址(路段)
        optionSelected_1: {value: ''}, // 性別
        optionSelected_2: {value: ''}, // 部門單位(部)
        optionSelected_3: {value: ''}, // 部門單位(處)
        optionSelected_4: {value: ''}, // 工作職務
        optionSelected_5: {value: ''}, // 通訊地址(縣市)
        optionSelected_6: {value: ''}, // 通訊地址(區)
    }

    isBoardVisible = true // 是否顯示儀表板

    isInformVisible = false // 控制按鈕切換的狀態

    /* 初始化的函式 */
    ngOnInit() {
        const pageStateKeys: Array<keyof Hr110ListInterface> = [
            'showInformKey',
            'showPage',
            'inputText_1',
            'inputText_2',
            'inputText_3',
            'inputText_4',
            'inputText_5',
            'inputText_6',
            'inputText_7',
            'optionSelected_1',
            'optionSelected_2',
            'optionSelected_3',
            'optionSelected_4',
            'optionSelected_5',
            'optionSelected_6',
        ]

        pageStateKeys.forEach((key) => {
            this.formState[key].value =
                this.pageStateService.getPageState(key) ?? ''
            if (!this.pageStateService.getPageState('showPage')) {
                this.formState['showPage'].value = 'hr110-list'
            }
            if (this.pageStateService.getPageState('showInformKey')) {
                this.isInformVisible = true
            }
        })
    }

    /*
     * 控制選單資料
     */
    // 性別
    selectOptions_1 = ['男性', '女性']
    // 部門單位(部)
    selectOptions_2 = [
        '事務部',
        '會計部',
        '工程部',
        '人事部',
        '資訊部',
        '行銷部',
        '研發部',
        '客服部',
        '財務部',
        '法務部',
    ]
    // 部門單位(處)
    selectOptions_3 = [
        '支付創新處',
        '服務應用處',
        '數據分析處',
        '網絡安全處',
        '用戶體驗處',
        '市場研究處',
        '技術支援處',
        '產品設計處',
        '合作夥伴處',
    ]
    // 工作職務
    selectOptions_4 = [
        '軟體工程師',
        '產品經理',
        '業務經理',
        '市場專員',
        '財務分析師',
        '人力資源專員',
        '客戶服務代表',
        '數據科學家',
        '網絡工程師',
        '設計師',
        '運營經理',
        '項目經理',
        '合規專員',
        '測試工程師',
        '技術支持專員',
        '內容創作者',
        '社交媒體經理',
        '業務分析師',
        '行政助理',
    ]
    // 通訊地址(縣市)
    selectOptions_5 = [
        '台北市',
        '新北市',
        '桃園市',
        '台中市',
        '台南市',
        '高雄市',
        '基隆市',
        '新竹市',
        '嘉義市',
        '新竹縣',
        '苗栗縣',
        '彰化縣',
        '南投縣',
        '雲林縣',
        '嘉義縣',
        '屏東縣',
        '宜蘭縣',
        '花蓮縣',
        '台東縣',
        '澎湖縣',
        '金門縣',
        '連江縣',
    ]
    // 通訊地址(區)
    selectOptions_6 = [
        '中正區',
        '大同區',
        '中山區',
        '松山區',
        '大安區',
        '萬華區',
        '信義區',
        '士林區',
        '北投區',
        '內湖區',
        '南港區',
        '文山區',
        '板橋區',
        '三重區',
        '中和區',
        '永和區',
        '新莊區',
        '新店區',
        '樹林區',
        '鶯歌區',
        '三峽區',
        '淡水區',
        '瑞芳區',
        '土城區',
        '蘆洲區',
        '五股區',
        '泰山區',
        '林口區',
        '八里區',
        '平溪區',
        '雙溪區',
        '貢寮區',
        '金山區',
        '萬里區',
        '石門區',
        '桃園區',
        '中壢區',
        '平鎮區',
        '八德區',
        '楊梅區',
        '蘆竹區',
        '龜山區',
        '龍潭區',
        '大溪區',
        '大園區',
        '觀音區',
        '新屋區',
        '台中區',
        '大里區',
        '太平區',
        '霧峰區',
        '大甲區',
        '豐原區',
        '沙鹿區',
        '后里區',
        '東勢區',
        '烏日區',
        '神岡區',
        '大雅區',
        '潭子區',
        '大肚區',
        '龍井區',
        '石岡區',
        '外埔區',
        '和平區',
        '新營區',
        '鹽水區',
        '白河區',
        '柳營區',
        '後壁區',
        '東山區',
        '麻豆區',
        '下營區',
        '六甲區',
        '官田區',
        '大內區',
        '佳里區',
        '學甲區',
        '西港區',
        '七股區',
        '將軍區',
        '北門區',
        '新化區',
        '善化區',
        '新市區',
        '安定區',
        '山上區',
        '玉井區',
        '楠西區',
        '南化區',
        '左鎮區',
        '仁德區',
        '歸仁區',
        '關廟區',
        '龍崎區',
        '永康區',
        '高雄市區',
        '新興區',
        '前金區',
        '苓雅區',
        '鹽埕區',
        '鼓山區',
        '旗津區',
        '前鎮區',
        '三民區',
        '楠梓區',
        '小港區',
        '左營區',
        '仁武區',
        '大社區',
        '岡山區',
        '路竹區',
        '阿蓮區',
        '田寮區',
        '燕巢區',
        '橋頭區',
        '梓官區',
        '彌陀區',
        '永安區',
        '湖內區',
        '鳳山區',
        '大寮區',
        '林園區',
        '鳥松區',
        '大樹區',
        '旗山區',
        '美濃區',
        '六龜區',
        '內門區',
        '杉林區',
        '甲仙區',
        '桃源區',
        '那瑪夏區',
        '茂林區',
        '茄萣區',
    ]

    /* 控制是否顯示儀表板的函式 */
    showBoard() {
        this.isBoardVisible = !this.isBoardVisible
    }

    /* 控制輸入框的函式 */
    handleInputChanged(inputName: string, inputText: string) {
        switch (inputName) {
            case 'inputText_1': // 姓名
                this.formState.inputText_1.value = inputText
                this.saveData('inputText_1', inputText)
                break
            case 'inputText_2': // 身分證字號
                this.formState.inputText_2.value = inputText
                this.saveData('inputText_2', inputText)
                break
            case 'inputText_3': // 員工編號
                this.formState.inputText_3.value = inputText
                this.saveData('inputText_3', inputText)
                break
            case 'inputText_4': // 部門單位
                this.formState.inputText_4.value = inputText
                this.saveData('inputText_4', inputText)
                break
            case 'inputText_5': // 通訊電話
                this.formState.inputText_5.value = inputText
                this.saveData('inputText_5', inputText)
                break
            case 'inputText_6': // 受僱日期（起日）
                this.formState.inputText_6.value = inputText
                this.saveData('inputText_6', inputText)
                break
            case 'inputText_7': // 受僱日期（迄日）
                this.formState.inputText_7.value = inputText
                this.saveData('inputText_7', inputText)
                break
            default:
                console.error('Invalid input name.')
        }
    }

    /* 控制選擇器的函式 */
    handleSelectChanged(selectName: string, selectOption: string) {
        switch (selectName) {
            case 'selectOption_1': // 性別
                this.formState.optionSelected_1.value = selectOption
                this.saveData('optionSelected_1', selectOption)
                break
            case 'selectOption_2': // 部門單位（部）
                this.formState.optionSelected_2.value = selectOption
                this.saveData('optionSelected_2', selectOption)
                break
            case 'selectOption_3': // 部門單位（處）
                this.formState.optionSelected_3.value = selectOption
                this.saveData('optionSelected_3', selectOption)
                break
            case 'selectOption_4': // 工作職務
                this.formState.optionSelected_4.value = selectOption
                this.saveData('optionSelected_4', selectOption)
                break
            case 'selectOption_5': // 通訊地址（縣市）
                this.formState.optionSelected_5.value = selectOption
                this.saveData('optionSelected_5', selectOption)
                break
            case 'selectOption_6': // 通訊地址（區）
                this.formState.optionSelected_5.value = selectOption
                this.saveData('optionSelected_5', selectOption)
                break
            default:
                console.error('選擇名稱無效。')
        }
    }

    /* 控制查詢資料的函式 */
    handleShowInformChanged(eventName: string, eventValue: string) {
        switch (eventName) {
            case 'showInform_1': // 人員搜尋
                this.isInformVisible = this.isInformVisible
                    ? this.isInformVisible
                    : !this.isInformVisible
                this.formState.showInformKey.value = eventValue
                break
            case 'showInform_output': // 儀表板: 已離職/在職中
                this.isInformVisible = this.isInformVisible
                    ? this.isInformVisible
                    : !this.isInformVisible
                this.formState.showInformKey.value = eventValue
                break
            default:
                console.error('選擇名稱無效。')
        }

        this.saveData('showInformKey', this.formState.showInformKey.value)
        this.scrollToMid()
    }

    /* 儲存資料的函式 */
    saveData(key: string, value: any): void {
        this.pageStateService.setPageState(key, value)
    }

    /* 關閉tab的函式 */
    closeTab(identifier: string) {
        this.tabService.closeTab(identifier)
    }

    /* scrollBar回到中部的函式 */
    scrollToMid() {
        const element = document.querySelector('.inner-content')
        if (element) {
            // 使用 requestAnimationFrame 確保 DOM 完全更新後再滾動
            requestAnimationFrame(() => {
                const midPosition =
                    (element.scrollHeight - element.clientHeight) / 3
                element.scrollTo({
                    top: midPosition,
                    behavior: 'smooth',
                })
            })
        }
    }
}
