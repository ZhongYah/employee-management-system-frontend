import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {SharedModule} from '../../shared/shared.module'
import { HIDE, WITNESS } from '../../utils/passwordHelper'

/**
 * 輸入框元件
 *
 * 寬度樣式 [inputWidth]="'寬度字串'"
 * 可用的寬度範圍：
 * - 百分比：15% ~ 100%
 * - 像素：70px ~ 300px
 * - 寬度值皆以 5 為單位遞增
 *
 * 範例：
 * - '20pc' 表示 20 百分比 寬度
 * - '125px' 表示 125 像素 寬度
 *
 * 附加客製化樣式 [attachClassName]="[...'樣式字串']" 可傳入多個 {需把客製化樣式定義在元件的.scss檔}
 *
 * 預設已輸入內容 [contentEntered]="any" 指定輸入框內容為預設已輸入內容
 *
 * disabled 預設為false 可提供布林值 禁用輸入框;
 *
 * type 預設為text [type]="'字串'" 可輸入'PWD':密碼類型; 'NUMBER':純數字類型
 * 
 * placeholderText 為預設字詞 [placeholderText]="'字串'"
 */
@Component({
    selector: 'app-input',
    standalone: true,
    imports: [SharedModule],
    templateUrl: './input.component.html',
    styleUrl: './input.component.scss',
})
export class InputComponent implements OnInit {
    @Input() inputWidth: string = ''
    @Input() attachClassName: string[] = []
    @Input() contentEntered: string = ''
    @Input() disabled: boolean = false
    @Input() type: string = ''
    @Input() placeholderText: string = ''; 

    @Output() inputTextChange = new EventEmitter<string>()

    enteredContent: string = '' // 預設輸入框內容

    showPassword: boolean = false // 顯示/隱藏密碼

    constructor() {}

    ngOnInit() {
        this.enteredContent = this.contentEntered ? this.contentEntered : ''
    }

    toggleShowPassword() {
        this.showPassword = !this.showPassword
    }

    getIconClass(action: 'show' | 'hide'): string {
        return action === 'show' ? WITNESS : HIDE
    }

    getInputType(): string {
        let type = this.type
        if (type === 'PWD') {
            return this.showPassword ? 'text' : 'password'
        }
        switch (type) {
            case 'PWD':
                type = 'password'
                break
            case 'NUMBER':
                type = 'number'
                break
            default:
                type = 'text' // 默認類型設置為 'text'
                break
        }
        return type
    }

    getInputClass(): string {
        let classes = []
        if (this.inputWidth.includes('pc')) {
            let widthValue = this.inputWidth.replace('pc', '')
            switch (widthValue) {
                case '15':
                    classes.push('input-width-15pc')
                    break
                case '20':
                    classes.push('input-width-20pc')
                    break
                case '25':
                    classes.push('input-width-25pc')
                    break
                case '30':
                    classes.push('input-width-30pc')
                    break
                case '35':
                    classes.push('input-width-35pc')
                    break
                case '40':
                    classes.push('input-width-40pc')
                    break
                case '45':
                    classes.push('input-width-45pc')
                    break
                case '50':
                    classes.push('input-width-50pc')
                    break
                case '55':
                    classes.push('input-width-55pc')
                    break
                case '60':
                    classes.push('input-width-60pc')
                    break
                case '65':
                    classes.push('input-width-65pc')
                    break
                case '70':
                    classes.push('input-width-70pc')
                    break
                case '75':
                    classes.push('input-width-75pc')
                    break
                case '80':
                    classes.push('input-width-80pc')
                    break
                case '85':
                    classes.push('input-width-85pc')
                    break
                case '90':
                    classes.push('input-width-90pc')
                    break
                case '95':
                    classes.push('input-width-95pc')
                    break
                case '100':
                    classes.push('input-width-100pc')
                    break
                default:
                    break
            }
        }

        if (this.inputWidth.includes('px')) {
            let widthValue = this.inputWidth.replace('px', '')
            switch (widthValue) {
                case '70':
                    classes.push('input-width-70px')
                    break
                case '75':
                    classes.push('input-width-75px')
                    break
                case '80':
                    classes.push('input-width-80px')
                    break
                case '85':
                    classes.push('input-width-85px')
                    break
                case '90':
                    classes.push('input-width-90px')
                    break
                case '95':
                    classes.push('input-width-95px')
                    break
                case '100':
                    classes.push('input-width-100px')
                    break
                case '105':
                    classes.push('input-width-105px')
                    break
                case '110':
                    classes.push('input-width-110px')
                    break
                case '115':
                    classes.push('input-width-115px')
                    break
                case '120':
                    classes.push('input-width-120px')
                    break
                case '125':
                    classes.push('input-width-125px')
                    break
                case '130':
                    classes.push('input-width-130px')
                    break
                case '135':
                    classes.push('input-width-135px')
                    break
                case '140':
                    classes.push('input-width-140px')
                    break
                case '145':
                    classes.push('input-width-145px')
                    break
                case '150':
                    classes.push('input-width-150px')
                    break
                case '155':
                    classes.push('input-width-155px')
                    break
                case '160':
                    classes.push('input-width-160px')
                    break
                case '165':
                    classes.push('input-width-165px')
                    break
                case '170':
                    classes.push('input-width-170px')
                    break
                case '175':
                    classes.push('input-width-175px')
                    break
                case '180':
                    classes.push('input-width-180px')
                    break
                case '185':
                    classes.push('input-width-185px')
                    break
                case '190':
                    classes.push('input-width-190px')
                    break
                case '195':
                    classes.push('input-width-195px')
                    break
                case '200':
                    classes.push('input-width-200px')
                    break
                case '205':
                    classes.push('input-width-205px')
                    break
                case '210':
                    classes.push('input-width-210px')
                    break
                case '215':
                    classes.push('input-width-215px')
                    break
                case '220':
                    classes.push('input-width-220px')
                    break
                case '225':
                    classes.push('input-width-225px')
                    break
                case '230':
                    classes.push('input-width-230px')
                    break
                case '235':
                    classes.push('input-width-235px')
                    break
                case '240':
                    classes.push('input-width-240px')
                    break
                case '245':
                    classes.push('input-width-245px')
                    break
                case '250':
                    classes.push('input-width-250px')
                    break
                case '255':
                    classes.push('input-width-255px')
                    break
                case '260':
                    classes.push('input-width-260px')
                    break
                case '265':
                    classes.push('input-width-265px')
                    break
                case '270':
                    classes.push('input-width-270px')
                    break
                case '275':
                    classes.push('input-width-275px')
                    break
                case '280':
                    classes.push('input-width-280px')
                    break
                case '285':
                    classes.push('input-width-285px')
                    break
                case '290':
                    classes.push('input-width-290px')
                    break
                case '295':
                    classes.push('input-width-295px')
                    break
                case '300':
                    classes.push('input-width-300px')
                    break
                default:
                    break
            }
        }

        if (this.attachClassName.length > 0) {
            classes.push(...this.attachClassName)
        }

        return classes.join(' ')
    }

    onInputTextChange(event: any) {
        this.enteredContent = event
        this.inputTextChange.emit(this.enteredContent)
    }
}
