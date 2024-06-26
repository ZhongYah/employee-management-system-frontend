import {EventInput} from '@fullcalendar/core'

let eventGuid = 0
const TODAY_STR = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD 

export function createEventId() {
    return String(eventGuid++)
}

export const INITIAL_EVENTS: EventInput[] = [
    {
        id: createEventId(),
        title: '小明居家上班',
        start: TODAY_STR,
        end: '',
        extendedProps: {
            ownerId: '123',
            location: '',
            summary: '這是全天活動的詳細描述。',
        },
    },
    {
        id: createEventId(),
        title: '喪彪報到',
        start: TODAY_STR + 'T09:38:00',
        end: TODAY_STR + 'T15:00:00',
        extendedProps: {
            ownerId: '123',
            location: '',
            summary: '這是早上定時事件的詳細描述。',
        },
    },
    {
        id: createEventId(),
        title: '小帥離職',
        start: '2024-06-20T14:20:00',
        end: '2024-06-20T15:50:00',
        extendedProps: {
            ownerId: '124',
            location: '',
            summary: '這是下午定時活動的詳細描述。',
        },
    },
    {
        id: createEventId(),
        title: '共享午餐',
        start: '2024-06-06T12:00:00',
        end: '2024-06-06T14:00:00',
        extendedProps: {
            ownerId: '124',
            location: '西提牛排',
            summary: '這是午餐活動的詳細描述。',
        },
    },
    {
        id: createEventId(),
        title: '5月入職員工教育訓練',
        start: '2024-06-02T09:33:20',
        end: '2024-06-08T20:41:20',
        extendedProps: {
            ownerId: '124',
            location: '蘭嶼',
            summary: '這是教育訓練活動的概要描述。',
        },
    },
    {
        id: createEventId(),
        title: '董事長出差',
        start: '2024-06-03T13:20:10',
        end: '2024-06-07T22:00:00',
        extendedProps: {
            ownerId: '126',
            location: '小琉球',
            summary: '這是商務旅行活動的概要描述。',
        },
    },
    {
        id: createEventId(),
        title: '人資B與小美面試',
        start: '2024-06-05T08:30:10',
        end: '2024-06-05T10:30:50',
        extendedProps: {
            ownerId: '123',
            location: '公司',
            summary: '這是面試活動的摘要描述。',
        },
    },
    {
        id: createEventId(),
        title: '與廠商A視訊會議',
        start: '2024-06-04',
        end: '2024-06-07',
        extendedProps: {
            ownerId: '123',
            location: '線上',
            summary: '這是視訊會議活動的摘要描述。',
        },
    },
]
