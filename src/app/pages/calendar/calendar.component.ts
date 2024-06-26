import {Component, TemplateRef, ViewChild, signal} from '@angular/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import zhLocale from '@fullcalendar/core/locales/zh-tw'
import {CalendarOptions, DateSelectArg, EventClickArg} from '@fullcalendar/core'
import {SharedModule} from '../../common/shared/shared.module'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import {ButtonComponent} from '../../common/components/button/button.component'
import {INITIAL_EVENTS} from '../../common/utils/event-utils'
import tippy from 'tippy.js' // 引入 Tippy.js
import 'tippy.js/dist/tippy.css'
import {MatDialog} from '@angular/material/dialog'
import {ModalComponent} from '../../common/components/modal/modal.component'
import {InputComponent} from '../../common/components/input/input.component'

@Component({
    selector: 'app-calendar',
    standalone: true,
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
    imports: [SharedModule, ButtonComponent, InputComponent],
})
export class CalendarComponent {
    @ViewChild('contentTemplate', {static: true})
    contentTemplate!: TemplateRef<any>

    modalData: any

    selectedEvent: any

    currentUserId = '123' // 假設目前使用者的 ID

    constructor(private dialog: MatDialog) {
        // 初始化日期與隨機顏色的映射
        this.initializeDateColorMap()
    }

    // 打開模態對話框顯示事件詳細信息
    openModal(title: string, contentTemplate: any): void {
        this.dialog.open(ModalComponent, {
            width: '500px',
            height: '550px',
            data: {
                title: title,
                contentTemplate: contentTemplate,
                // button: '關閉視窗',
            },
        })
    }

    private dateColorMap: Map<string, string> = new Map() // 日期顏色映射表

    private readonly availableColors: string[] = [
        '#8ee3df',
        '#f5ab82',
        '#c5a8fe',
        '#fcd481',
        '#d1d3e0',
    ]

    private lastAssignedColorIndex = -1 // 最後指派的顏色索引

    /* 初始化既有事件的顏色 */
    private initializeDateColorMap() {
        INITIAL_EVENTS.forEach((event) => {
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

    // 日曆選項
    calendarOptions = signal<CalendarOptions>({
        plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        },
        initialView: 'dayGridMonth',
        initialEvents: INITIAL_EVENTS.map((event) => ({
            ...event,
            backgroundColor:
                this.getColorForDate(event.start?.toString().split('T')[0]!) ??
                this.assignColorForDate(event.start?.toString().split('T')[0]!),
            textColor: 'black',
        })),
        height: '1000px',
        weekends: true,
        editable: false,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        locale: zhLocale,
        firstDay: 0,
        select: this.handleDateSelect.bind(this),
        eventClick: this.handleEventClick.bind(this),
        eventDidMount: this.handleEventDidMount.bind(this),
    })

    handleDateSelect(selectInfo: DateSelectArg) {
        const title = prompt('請輸入新建行程的標題')
        const calendarApi = selectInfo.view.calendar
        calendarApi.unselect()

        if (title) {
            const eventDate = selectInfo.startStr.split('T')[0]
            const eventColor =
                this.getColorForDate(eventDate) ||
                this.assignColorForDate(eventDate)
            calendarApi.addEvent({
                id: this.createEventId(),
                title,
                start: selectInfo.startStr,
                end: selectInfo.startStr,
                allDay: selectInfo.allDay,
                backgroundColor: eventColor,
                textColor: 'black',
                extendedProps: {
                    ownerId: this.currentUserId,
                },
            })
            this.dateColorMap.set(eventDate, eventColor)
        }
    }

    // 點擊事件處理函式
    handleEventClick(eventClickInfo: EventClickArg) {
        const {event} = eventClickInfo
        console.log(event)

        const title = event.title
        const startDate = event.startStr
        const endDate = event.endStr === '' ? event.startStr : event.endStr
        const location = event.extendedProps['location']
        const summary = event.extendedProps['summary']
        const ownerId = event.extendedProps['ownerId']
        let showEdit = false

        if (ownerId === this.currentUserId) {
            showEdit = true
        }

        this.modalData = {
            title: title,
            startDate: startDate.replace(/T.*$/, ''),
            startDateTime: startDate.substring(11, 19),
            endDate: endDate.replace(/T.*$/, ''),
            endDateTime: endDate.substring(11, 19),
            location: location,
            summary: summary,
            showEdit: showEdit,
            event: event.extendedProps,
        }

        this.selectedEvent = event
        this.openModal(title, this.contentTemplate)
    }

    handleEventDidMount(eventMountInfo: any) {
        const title = eventMountInfo.event.title
        const summary = eventMountInfo.event.extendedProps['summary']

        const titleBgColor = '#f0f0f0'
        const detailBgColor = '#ffffff'

        const content = `
      <div style="background-color: ${titleBgColor}; padding: 1px;">
        <strong>${title}</strong>
      </div>
      <div style="background-color: ${detailBgColor}; padding: 1px;">
        ${summary}
      </div>
    `

        tippy(eventMountInfo.el, {
            content: content,
            allowHTML: true,
            placement: 'bottom',
            theme: 'custom',
            arrow: true,
            offset: [0, 8],
            delay: [500, 200],
        })

        // const eventElement: HTMLElement | null =
        //   eventMountInfo.el.querySelector('.fc-event-time');
        // if (eventElement) {
        //   const timeText = eventElement.textContent?.trim();
        //   if (timeText) {
        //     const formattedTime = this.formatTime(timeText); // Format time here as needed
        //     eventElement.textContent = formattedTime;
        //   }
        // }
    }

    // private formatTime(time: string): string {
    //   let hour = parseInt(time.match(/\d+/)?.[0] || '0');
    //   const minute = time.match(/:\d+/)?.[0] || ':00';

    //   if (time.includes('下午') && hour !== 12) {
    //     hour += 12;
    //   }
    //   if (time.includes('上午') && hour === 12) {
    //     hour = 0;
    //   }

    //   const formattedHour = hour.toString().padStart(2, '0');
    //   const formattedMinute = minute.padStart(3, ':0').substring(1);

    //   return `${formattedHour}:${formattedMinute}`;
    // }

    createEventId() {
        return String(Math.floor(Math.random() * 10000)) // 隨機 ID 生成
    }
    isEditing = false

    toggleEdit() {
        if (this.isEditing) {
        }
        this.isEditing = !this.isEditing
    }

    onDeleteClick(): void {
        if (!this.selectedEvent) {
            console.error('沒有選擇要刪除的事件。')
            return
        }

        const ownerId = this.selectedEvent.extendedProps['ownerId']

        if (ownerId === this.currentUserId) {
            if (confirm(`您確定要刪除行程 '${this.selectedEvent.title}' 嗎?`)) {
                this.selectedEvent.remove() // 從日曆中刪除該事件
                this.dialog.closeAll() // 關閉任何開啟的對話框或模式
                this.selectedEvent = null // 清除選定的事件
            }
        } else {
            alert('您無權刪除此行程。')
        }
    }
}
