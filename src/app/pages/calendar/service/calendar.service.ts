import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable, of} from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class CalendarService {
    private apiUrl = '' // API URL

    constructor(private http: HttpClient) {}

    fetchCalendarData(startDate: string, endDate: string): Observable<any[]> {
        // 發送 GET 請求到後端 API，並傳遞日期範圍作為查詢參數

        // return this.http.get<any[]>(`${this.apiUrl}`, {
        //   params: {
        //     startDate: startDate,
        //     endDate: endDate,
        //   },
        // });

        const mockEvents = [
            {
                endTimePicker: '17:00',
                startTimePicker: '09:00',
                endDatePicker: '2024-06-15',
                startDatePicker: '2024-06-15',
                start: '2024-06-15T09:00',
                description: '(09:00~17:00) 參加新人培訓',
                end: '2024-06-15T17:00',
                type: '入職',
                title: '李雅雯入職',
                userId: 'liya',
                key: '8aef81d18fc03e2d019145e1cd430f01',
            },
            {
                endTimePicker: '18:30',
                startTimePicker: '12:30',
                endDatePicker: '2024-06-20',
                startDatePicker: '2024-06-20',
                start: '2024-06-20T12:30',
                description: '(12:30~18:30) 與客戶午餐會議',
                end: '2024-06-20T18:30',
                type: '聚餐',
                title: '午餐會議',
                userId: 'shixuan',
                key: '8aef81d28fc03e2d019145e1cd430f02',
            },
            {
                endTimePicker: '19:00',
                startTimePicker: '14:00',
                endDatePicker: '2024-06-25',
                startDatePicker: '2024-06-25',
                start: '2024-06-25T14:00',
                description: '(14:00~19:00) 項目進度會議',
                end: '2024-06-25T19:00',
                type: '會議',
                title: '項目進度會議',
                userId: 'chenhao',
                key: '8aef81d28fc03e2d019145e1cd430f03',
            },
            {
                endTimePicker: '17:30',
                startTimePicker: '08:30',
                endDatePicker: '2024-07-01',
                startDatePicker: '2024-07-01',
                start: '2024-07-01T08:30',
                description: '(08:30~17:30) 員工健康檢查',
                end: '2024-07-01T17:30',
                type: '健康檢查',
                title: '年度健康檢查',
                userId: 'jingyi',
                key: '8aef81d28fc03e2d019145e1cd430f04',
            },
            {
                endTimePicker: '12:00',
                startTimePicker: '10:00',
                endDatePicker: '2024-07-05',
                startDatePicker: '2024-07-05',
                start: '2024-07-05T10:00',
                description: '(10:00~12:00) 王志明入職',
                end: '2024-07-05T12:00',
                type: '面試',
                title: '王志明入職',
                userId: 'min',
                key: '8aef81d28fc03e2d019145e1cd430f05',
            },
            {
                endTimePicker: '18:00',
                startTimePicker: '13:00',
                endDatePicker: '2024-07-10',
                startDatePicker: '2024-07-10',
                start: '2024-07-10T13:00',
                description: '(13:00~18:00) 參加年度培訓',
                end: '2024-07-10T18:00',
                type: '培訓',
                title: '年度培訓',
                userId: 'zhenyu',
                key: '8aef81d28fc03e2d019145e1cd430f06',
            },
            {
                endTimePicker: '17:30',
                startTimePicker: '08:30',
                endDatePicker: '2024-07-15',
                startDatePicker: '2024-07-15',
                start: '2024-07-15T08:30',
                description: '(08:30~17:30) 部門聚餐',
                end: '2024-07-15T17:30',
                type: '聚餐',
                title: '部門聚餐',
                userId: 'yuchen',
                key: '8aef81d28fc03e2d019145e1cd430f07',
            },
            {
                endTimePicker: '17:00',
                startTimePicker: '09:00',
                endDatePicker: '2024-07-20',
                startDatePicker: '2024-07-20',
                start: '2024-07-20T09:00',
                description: '(09:00~17:00) 產品發布會',
                end: '2024-07-20T17:00',
                type: '發布會',
                title: '產品發布會',
                userId: 'lina',
                key: '8aef81d28fc03e2d019145e1cd430f08',
            },
            {
                endTimePicker: '17:30',
                startTimePicker: '08:30',
                endDatePicker: '2024-07-25',
                startDatePicker: '2024-07-25',
                start: '2024-07-25T08:30',
                description: '(08:30~17:30) 張凱文離職',
                end: '2024-07-25T17:30',
                type: '離職',
                title: '張凱文離職',
                userId: 'kevin',
                key: '8aef81d28fc03e2d019145e1cd430f09',
            },
            {
                endTimePicker: '12:00',
                startTimePicker: '10:00',
                endDatePicker: '2024-07-30',
                startDatePicker: '2024-07-30',
                start: '2024-07-30T10:00',
                description: '(10:00~12:00) 公司文化培訓',
                end: '2024-07-30T12:00',
                type: '培訓',
                title: '文化培訓',
                userId: 'wenjing',
                key: '8aef81d28fc03e2d019145e1cd430f10',
            },
            {
                endTimePicker: '18:00',
                startTimePicker: '14:00',
                endDatePicker: '2024-08-01',
                startDatePicker: '2024-08-01',
                start: '2024-08-01T14:00',
                description: '(14:00~18:00) 銷售團隊會議',
                end: '2024-08-01T18:00',
                type: '會議',
                title: '銷售團隊會議',
                userId: 'xiaojun',
                key: '8aef81d28fc03e2d019145e1cd430f11',
            },
            {
                endTimePicker: '19:00',
                startTimePicker: '18:00',
                endDatePicker: '2024-08-05',
                startDatePicker: '2024-08-05',
                start: '2024-08-05T18:00',
                description: '(18:00~19:00) 公司的年中派對',
                end: '2024-08-05T19:00',
                type: '聚餐',
                title: '年中派對',
                userId: 'jingyu',
                key: '8aef81d28fc03e2d019145e1cd430f12',
            },
            {
                endTimePicker: '17:00',
                startTimePicker: '14:00',
                endDatePicker: '2024-08-10',
                startDatePicker: '2024-08-10',
                start: '2024-08-10T14:00',
                description: '(14:00~17:00) 技術團隊研討會',
                end: '2024-08-10T17:00',
                type: '會議',
                title: '技術研討會',
                userId: 'joshua',
                key: '8aef81d28fc03e2d019145e1cd430f13',
            },
            {
                startTimePicker: '09:00',
                startDatePicker: '2024-08-12',
                start: '2024-08-12T09:00',
                description: '全天公司大掃除',
                type: '公司活動',
                title: '大掃除',
                userId: 'wendy',
                key: '8aef81d28fc03e2d019145e1cd430f14',
            },
            {
                endTimePicker: '11:00',
                startTimePicker: '09:00',
                endDatePicker: '2024-08-15',
                startDatePicker: '2024-08-15',
                start: '2024-08-15T09:00',
                description: '(09:00~11:00) 新產品測試',
                end: '2024-08-15T11:00',
                type: '產品測試',
                title: '新產品測試',
                userId: 'yanlin',
                key: '8aef81d28fc03e2d019145e1cd430f15',
            },
            {
                endTimePicker: '16:00',
                startTimePicker: '10:00',
                endDatePicker: '2024-08-20',
                startDatePicker: '2024-08-19',
                start: '2024-08-19T10:00',
                description: '(08-19 10:00~08-20 16:00) 參加外部培訓',
                end: '2024-08-20T16:00',
                type: '培訓',
                title: '外部培訓',
                userId: 'david',
                key: '8aef81d28fc03e2d019145e1cd430f16',
            },
            {
                startTimePicker: '08:00',
                startDatePicker: '2024-08-21',
                start: '2024-08-21T08:00',
                description: '全天跨部門團建活動',
                type: '公司活動',
                title: '團建活動',
                userId: 'vicky',
                key: '8aef81d28fc03e2d019145e1cd430f17',
            },
            {
                endTimePicker: '12:00',
                startTimePicker: '10:00',
                endDatePicker: '2024-08-25',
                startDatePicker: '2024-08-25',
                start: '2024-08-25T10:00',
                description: '(10:00~12:00) 張敏莉面試',
                end: '2024-08-25T12:00',
                type: '面試',
                title: '張敏莉面試',
                userId: 'minli',
                key: '8aef81d28fc03e2d019145e1cd430f18',
            },
            {
                endTimePicker: '17:30',
                startTimePicker: '08:30',
                endDatePicker: '2024-08-28',
                startDatePicker: '2024-08-27',
                start: '2024-08-27T08:30',
                description: '(08-27 08:30~08-28 17:30) 系統升級維護',
                end: '2024-08-28T17:30',
                type: '維護',
                title: '系統升級維護',
                userId: 'xiwen',
                key: '8aef81d28fc03e2d019145e1cd430f19',
            },
            {
                startTimePicker: '09:00',
                startDatePicker: '2024-09-01',
                start: '2024-09-01T09:00',
                description: '全天企業文化日',
                type: '公司活動',
                title: '企業文化日',
                userId: 'lisa',
                key: '8aef81d28fc03e2d019145e1cd430f20',
            },
            {
                endTimePicker: '18:00',
                startTimePicker: '13:00',
                endDatePicker: '2024-09-05',
                startDatePicker: '2024-09-05',
                start: '2024-09-05T13:00',
                description: '(13:00~18:00) 市場推廣會議',
                end: '2024-09-05T18:00',
                type: '會議',
                title: '市場推廣會議',
                userId: 'xinyu',
                key: '8aef81d28fc03e2d019145e1cd430f21',
            },
            {
                startTimePicker: '10:00',
                startDatePicker: '2024-09-10',
                start: '2024-09-10T10:00',
                description: '全天技術支持',
                type: '支持',
                title: '技術支持',
                userId: 'zhuoling',
                key: '8aef81d28fc03e2d019145e1cd430f22',
            },
            {
                endTimePicker: '18:00',
                startTimePicker: '09:00',
                endDatePicker: '2024-08-29',
                startDatePicker: '2024-08-28',
                start: '2024-08-28T09:00',
                description: '(08-28 09:00~08-29 18:00) 伺服器遷移',
                end: '2024-08-29T18:00',
                type: '維護',
                title: '伺服器遷移',
                userId: 'shixuan',
                key: '8aef81d28fc03e2d019145e1cd430f23',
            },
            {
                endTimePicker: '17:00',
                startTimePicker: '13:00',
                endDatePicker: '2024-08-31',
                startDatePicker: '2024-08-31',
                start: '2024-08-31T13:00',
                description: '(13:00~17:00) 客戶需求訪談',
                end: '2024-08-31T17:00',
                type: '會議',
                title: '客戶訪談',
                userId: 'shixuan',
                key: '8aef81d28fc03e2d019145e1cd430f24',
            },
            {
                endTimePicker: '15:00',
                startTimePicker: '10:00',
                endDatePicker: '2024-09-03',
                startDatePicker: '2024-09-03',
                start: '2024-09-03T10:00',
                description: '(10:00~15:00) 系統測試',
                end: '2024-09-03T15:00',
                type: '測試',
                title: '系統測試',
                userId: 'shixuan',
                key: '8aef81d28fc03e2d019145e1cd430f25',
            },
            {
                startTimePicker: '08:30',
                startDatePicker: '2024-09-05',
                start: '2024-09-05T08:30',
                description: '全天數據遷移',
                type: '維護',
                title: '數據遷移',
                userId: 'shixuan',
                key: '8aef81d28fc03e2d019145e1cd430f26',
            },
            {
                endTimePicker: '12:00',
                startTimePicker: '09:00',
                endDatePicker: '2024-09-07',
                startDatePicker: '2024-09-07',
                start: '2024-09-07T09:00',
                description: '(09:00~12:00) 安全系統升級',
                end: '2024-09-07T12:00',
                type: '維護',
                title: '安全升級',
                userId: 'shixuan',
                key: '8aef81d28fc03e2d019145e1cd430f27',
            },
            {
                endTimePicker: '17:30',
                startTimePicker: '08:30',
                endDatePicker: '2024-09-10',
                startDatePicker: '2024-09-09',
                start: '2024-09-09T08:30',
                description: '(09-09 08:30~09-10 17:30) 測試環境設置',
                end: '2024-09-10T17:30',
                type: '維護',
                title: '測試環境設置',
                userId: 'shixuan',
                key: '8aef81d28fc03e2d019145e1cd430f28',
            },
            {
                endTimePicker: '11:30',
                startTimePicker: '09:30',
                endDatePicker: '2024-09-12',
                startDatePicker: '2024-09-12',
                start: '2024-09-12T09:30',
                description: '(09:30~11:30) 數據備份',
                end: '2024-09-12T11:30',
                type: '維護',
                title: '數據備份',
                userId: 'shixuan',
                key: '8aef81d28fc03e2d019145e1cd430f29',
            },
            {
                startTimePicker: '08:00',
                startDatePicker: '2024-09-15',
                start: '2024-09-15T08:00',
                description: '全天伺服器監控',
                type: '維護',
                title: '伺服器監控',
                userId: 'shixuan',
                key: '8aef81d28fc03e2d019145e1cd430f30',
            },
            {
                endTimePicker: '14:00',
                startTimePicker: '11:00',
                endDatePicker: '2024-09-18',
                startDatePicker: '2024-09-18',
                start: '2024-09-18T11:00',
                description: '(11:00~14:00) 網絡設備配置',
                end: '2024-09-18T14:00',
                type: '維護',
                title: '網絡配置',
                userId: 'shixuan',
                key: '8aef81d28fc03e2d019145e1cd430f31',
            },
            {
                endTimePicker: '17:30',
                startTimePicker: '08:30',
                endDatePicker: '2024-09-21',
                startDatePicker: '2024-09-20',
                start: '2024-09-20T08:30',
                description: '(09-20 08:30~09-21 17:30) 數據庫優化',
                end: '2024-09-21T17:30',
                type: '維護',
                title: '數據庫優化',
                userId: 'shixuan',
                key: '8aef81d28fc03e2d019145e1cd430f32',
            },
            {
                startTimePicker: '10:00',
                startDatePicker: '2024-09-23',
                start: '2024-09-23T10:00',
                description: '全天應用程式測試',
                type: '測試',
                title: '應用測試',
                userId: 'shixuan',
                key: '8aef81d28fc03e2d019145e1cd430f33',
            },
            {
                endTimePicker: '12:30',
                startTimePicker: '08:30',
                endDatePicker: '2024-09-25',
                startDatePicker: '2024-09-25',
                start: '2024-09-25T08:30',
                description: '(08:30~12:30) 程序升級',
                end: '2024-09-25T12:30',
                type: '維護',
                title: '程序升級',
                userId: 'shixuan',
                key: '8aef81d28fc03e2d019145e1cd430f34',
            },
            {
                endTimePicker: '18:00',
                startTimePicker: '09:00',
                endDatePicker: '2024-09-27',
                startDatePicker: '2024-09-26',
                start: '2024-09-26T09:00',
                description: '(09-26 09:00~09-27 18:00) 網絡安全檢查',
                end: '2024-09-27T18:00',
                type: '維護',
                title: '安全檢查',
                userId: 'shixuan',
                key: '8aef81d28fc03e2d019145e1cd430f35',
            },
        ]

        return of(mockEvents)
    }
}