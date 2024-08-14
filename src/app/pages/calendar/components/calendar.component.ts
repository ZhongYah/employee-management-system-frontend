import {
    ChangeDetectorRef,
    Component,
    OnInit,
    TemplateRef,
    ViewChild,
} from '@angular/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import zhLocale from '@fullcalendar/core/locales/zh-tw'
import {CalendarOptions, EventClickArg, EventInput} from '@fullcalendar/core'
import {SharedModule} from '../../../common/shared/shared.module'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import {ButtonComponent} from '../../../common/components/button/button.component'
import tippy from 'tippy.js'
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import {ModalComponent} from '../../../common/components/modal/modal.component'
import {InputComponent} from '../../../common/components/input/input.component'
import {FullCalendarComponent} from '@fullcalendar/angular'
import {CalendarService} from '../service/calendar.service'

@Component({
    selector: 'app-calendar',
    standalone: true,
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
    imports: [SharedModule, ButtonComponent, InputComponent],
})
export class CalendarComponent implements OnInit {
    @ViewChild(FullCalendarComponent)
    calendarComponent!: FullCalendarComponent // 引用模板內的 FullCalendarComponent
    @ViewChild('contentTemplate', {static: true}) //  引用輸入模板 html
    contentTemplate!: TemplateRef<any> // 燈箱內的輸入模板參考
    dialogRef!: MatDialogRef<any> // 燈箱參考
    calendarOptions!: CalendarOptions // 日曆選項
    scrollPosition!: number // 在打開燈箱時記錄滾動位置
    modalData: any // 輸入模板的資料
    selectedEvent: any // 被選擇的事件
    currentUserId = 'shixuan' // 假設目前使用者的 ID ; TODO 要改成真實的userId 從auth取得
    isEditing = false // 可否編輯的預設狀態

    constructor(
        private dialog: MatDialog, // 注入燈箱方法
        private calendarService: CalendarService, // 注入 CalendarService
        private cdr: ChangeDetectorRef // 變更檢測器參考
    ) {}

    ngOnInit(): void {
        // 日曆選項
        this.calendarOptions = {
            plugins: [
                interactionPlugin,
                dayGridPlugin,
                timeGridPlugin,
                listPlugin,
            ],
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
            },
            initialView: 'dayGridMonth',
            events: [], // 預設事件為空
            height: '1200px',
            dayMaxEvents: false,
            weekends: true,
            editable: false,
            selectable: true,
            selectMirror: true,
            locale: zhLocale,
            firstDay: 0,
            eventClick: this.handleEventClick.bind(this),
            eventDidMount: this.handleEventDidMount.bind(this),
            datesSet: this.handleDatesSet.bind(this),
            eventTimeFormat: {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            },
        }
    }

    // 日期顏色映射表
    private dateColorMap: Map<string, string> = new Map()

    // 事件背景自定義配色
    private readonly availableColors: string[] = [
        '#8ee3df',
        '#f5ab82',
        '#c5a8fe',
        '#fcd481',
        '#d1d3e0',
    ]

    // 最後指派的顏色索引, 事件背景配色參考用
    private lastAssignedColorIndex = -1

    /* 初始化既有事件的顏色 */
    private initializeDateColorMap(events: EventInput[]) {
        events.forEach((event) => {
            const eventDate = event.start?.toString().split('T')[0]
            if (eventDate && !this.dateColorMap.has(eventDate)) {
                const color = this.assignColorForDate(eventDate)
                this.dateColorMap.set(eventDate, color)
            }
        })
    }

    // 為日期指定顏色
    private assignColorForDate(date: string): string {
        if (this.dateColorMap.has(date)) {
            return this.dateColorMap.get(date)!
        }
        // 選擇下一個顏色
        this.lastAssignedColorIndex =
            (this.lastAssignedColorIndex + 1) % this.availableColors.length
        const assignedColor = this.availableColors[this.lastAssignedColorIndex]
        this.dateColorMap.set(date, assignedColor) // 立即儲存顏色
        return assignedColor
    }

    // 取得日期顏色
    private getColorForDate(date: string): string | undefined {
        return this.dateColorMap.get(date)
    }

    // 變更行事曆事件
    private updateCalendarOptions(events: EventInput[]): void {
        const formattedEvents: EventInput[] = events.map((event) => ({
            ...event,
            backgroundColor:
                this.getColorForDate(event.start?.toString().split('T')[0]!) ??
                this.assignColorForDate(event.start?.toString().split('T')[0]!),
            textColor: 'black',
        }))

        // 加入事件
        this.calendarOptions = {
            ...this.calendarOptions,
            events: formattedEvents, // 確保這裡傳入的是有效的 EventInput
        }

        // 手動刷新日曆
        if (this.calendarComponent) {
            const calendarApi = this.calendarComponent.getApi()
            calendarApi.removeAllEvents() // 移除現有事件
            if (formattedEvents.length > 0) {
                calendarApi.addEventSource(formattedEvents) // 添加新事件
            }
        }

        // 手動觸發變化檢測
        this.cdr.detectChanges()
    }

    // 處理日期區間變更的函式
    handleDatesSet(info: {
        start: string | number | Date
        end: string | number | Date
    }): void {
        const start = new Date(info.start)
        const end = new Date(info.end)
        start.setDate(start.getDate() + 1)

        const startDate = start.toISOString().split('T')[0]
        const endDate = end.toISOString().split('T')[0]

        // 用日期區間查詢行事曆資料，然後更新 events
        this.calendarService.fetchCalendarData(startDate, endDate).subscribe(
            (events) => {
                // 初始化行事曆事件
                this.updateCalendarOptions(events)
                // 初始化日期與隨機顏色的映射
                this.initializeDateColorMap(events)
            },
            (error) => {
                console.error('取得日曆資料時出錯', error)
            }
        )
    }

    // 新建行程的函式
    handleEventCreate() {
        this.isEditing = true
        this.modalData = {
            id: '', // 後端hash產生
            title: '',
            startDateTime: '',
            endDateTime: '',
            startDate: '',
            endDate: '',
            location: '',
            summary: '',
            showCreate: true,
        }
        this.openModal('新建行程', this.contentTemplate)
    }

    /* 控制輸入框的函式 */
    handleInputChanged(inputName: string, inputText: string) {
        switch (inputName) {
            case 'title': // 行事曆標題
                this.modalData.title = inputText
                break
            case 'location': // 行事曆地點
                this.modalData.location = inputText
                break
            default:
                console.error('Invalid input name.')
        }
    }

    // 確定新增行程的函式
    handleEventAdd() {
        // 啟用編輯狀態
        this.isEditing = false
        // TODO 將燈箱資料modalData [submit]到後端 待新增到資料庫成功後 再重新[query]行事曆資料
        console.log(this.modalData)
        // TODO
        // 交易成功 => 關閉新增行程燈箱;
        // 交易失敗 => 關閉新增行程燈箱後 在跳錯誤訊息燈箱;
        this.closeModal()
    }

    // 點擊事件處理的函式
    handleEventClick(eventClickInfo: EventClickArg) {
        this.isEditing = false
        const {event} = eventClickInfo
        const title = event.title
        const startDateTime = event.extendedProps['startTimePicker']
        const endDateTime = event.extendedProps['endTimePicker']
        const startDate = event.startStr.split('T')[0]
        const endDate = event.endStr.split('T')[0]
        const location = event.extendedProps['type']
        const summary = event.extendedProps['description']
        const ownerId = event.extendedProps['userId']
        let showEdit = false

        // 只能編輯本人的行事曆資料
        if (ownerId === this.currentUserId) {
            showEdit = true
        }

        this.modalData = {
            title: title,
            startDateTime: startDateTime,
            endDateTime: endDateTime,
            startDate: startDate,
            endDate: endDate,
            location: location,
            summary: summary,
            showEdit: showEdit,
        }

        this.selectedEvent = event
        this.openModal(title, this.contentTemplate)
    }

    // 滑鼠游標顯示tippy的函式
    handleEventDidMount(eventMountInfo: any) {
        const title = eventMountInfo.event.title
        const detail = eventMountInfo.event.extendedProps['description']
        const titleBgColor = '#f0f0f0'
        const detailBgColor = '#ffffff'
        const content = `
          <div style="background-color: ${titleBgColor}; padding: 10px; text-align: center; font-size: 15px;">
           <strong>${title}</strong>
          </div>
          <div style="background-color: ${detailBgColor}; padding: 10px; text-align: center; font-size: 15px;">
           ${detail}
          </div>
      `

        tippy(eventMountInfo.el, {
            content: content,
            allowHTML: true,
            placement: 'bottom',
            theme: 'custom',
            arrow: true, // 內置箭頭
            offset: [0, 8],
            delay: [500, 200],
        })
    }

    // 切換編輯狀態的函式
    toggleEdit() {
        this.isEditing = !this.isEditing
        // TODO 如果是保存 且 資料有異動 則[Update]行事曆資料
        if (!this.isEditing) {
        }
    }

    // 刪除事件的函式
    onDeleteClick(): void {
        this.scrollPosition = window.scrollY // 記錄滾動位置
        if (!this.selectedEvent) {
            console.error('沒有選擇要刪除的事件。')
            return
        }
        // 只能刪除本人的行事曆資料
        const ownerId = this.selectedEvent.extendedProps['userId']

        if (ownerId === this.currentUserId) {
            if (confirm(`您確定要刪除行程 '${this.selectedEvent.title}' 嗎?`)) {
                // TODO [delete]資料庫該筆資料 再重新query行事曆資料
                this.selectedEvent.remove()
                this.selectedEvent = null
                this.closeModal()
            }
        } else {
            alert('您無權刪除此行程。')
        }
    }

    // 關閉燈箱
    closeModal(): void {
        window.scrollTo(0, this.scrollPosition) // 恢復滾動位置
        if (this.dialogRef) {
            this.dialogRef.close()
        }
    }

    // 開啟燈箱
    openModal(title: string, contentTemplate: any): void {
        this.scrollPosition = window.scrollY // 記錄滾動位置
        this.dialogRef = this.dialog.open(ModalComponent, {
            width: '600px',
            height: '550px',
            data: {
                title: title,
                contentTemplate: contentTemplate,
            },
            disableClose: true,
        })
    }
}
