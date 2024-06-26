import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { SharedModule } from '../../../../common/shared/shared.module';
import { ButtonComponent } from '../../../../common/components/button/button.component';
import { SelectComponent } from '../../../../common/components/select/select.component';
import { PaginationComponent } from '../../../../common/components/pagination/pagination.component';
import { Hr110List2Interface } from '../service/hr110-list2-interface';
import { PageStateService } from '../../../../page-state.service';

@Component({
  selector: 'app-hr110-list2',
  standalone: true,
  templateUrl: './hr110-list2.component.html',
  styleUrl: './hr110-list2.component.scss',
  imports: [
    SharedModule,
    ButtonComponent,
    SelectComponent,
    PaginationComponent,
  ],
})
export class Hr110List2Component implements OnInit {
  @Input() renderKey: string = '';

  @Output() switchToEdit = new EventEmitter<any>();

  items: any[] = [];

  /* 注入共用Service  */
  constructor(
    private pageStateService: PageStateService // 儲存狀態的Service
  ) {
    const originalData = {
      name: '小明',
      id: '009527',
      location: '公園',
      date: '112/05/20',
      immediateSupervisor: '小華',
      formFiller: '人資A',
      selectedOption_1: [
        '不受用考核',
        '考核優異',
        '考核尚可',
        '考核未達標準'
      ],
      selectedOption_2: ['主管A', '主管B', '主管C'],
      status_1: '尚未考核',
      status_2: '已離職',
      status_3: '在職中',
      status_4: '年資3年',
      status_5: '未滿1年',
      optionSelected_1: '考核優異',
      optionSelected_2: '主管C',
    };

    for (let i = 0; i < 15; i++) {
      const newData = { ...originalData };
      this.items.push(newData);
    }
  }

  /* 控制表單欄位狀態 */
  formState: Hr110List2Interface = {
    renderKey: { value: '' }, // 要顯示哪個查詢結果的參數
  };

  /* 初始化的函式 */
  ngOnInit() {
    this.formState.renderKey.value = this.renderKey;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['renderKey']) {
      this.saveData('renderKey', changes['renderKey'].currentValue);
      console.log('renderKey changed:', changes['renderKey'].currentValue);
    }
  }

  /* 儲存資料的函式 */
  saveData(key: string, value: any): void {
    this.pageStateService.setPageState(key, value);
  }
}
