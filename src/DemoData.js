const DemoData = {
    resources: [
        {
            id: 'r0',
            name: 'Историческая',
            bgColor: '#99ea38'
        },
        {
            id: 'r1',
            name: 'Новая',
            bgColor: '#d0e6fd'
        },
        {
            id: 'r2',
            name: 'Бетховенский зал',
            bgColor: '#34d5b7'
        },
        {
            id: 'r3',
            name: 'Камерная сцена',
            bgColor: '#04e3fc'
            
        },
        {
            id: 'r4',
            name: 'Верхняя сцена',
            bgColor: '#70c7fa'
        },
        {
            id: 'r5',
            name: 'БРЗ',
            bgColor: '#e2c190'
        },
        {
            id: 'r6',
            name: 'ОРЗ',
            bgColor: '#fdd3d3'
        }
    ],
    events: [
        {
            id: 1,
            start: '2019-06-07 12:00:00',
            end: '2019-06-07 14:00:00',
            resourceId: 'r0',
            title: 'Кармен (Пн,Ср,Пт)',
            bgColor: '#D9D9D9',
            rrule: 'FREQ=WEEKLY;DTSTART=20190601T013000Z;BYDAY=MO,WE,FR',
            showPopover: true
        },
        {
            id: 155,
            start: '2019-06-07 15:00:00',
            end: '2019-06-07 17:30:00',
            resourceId: 'r0',
            title: 'Иван Грозный',
            bgColor: '#D9D9D9',
            showPopover: true
        },
        {
            id: 2,
            start: '2019-06-04 15:00:00',
            end: '2019-06-04 18:45:00',
            resourceId: 'r1',
            title: 'Идиот (Вт,Чт,Пт)',
            rrule: 'FREQ=WEEKLY;DTSTART=20190601T013000Z;BYDAY=TU,TH,FR',
            resizable: true
        },
        {
            id: 3,
            start: '2019-06-07 10:00:00',
            end: '2019-06-07 15:00:00',
            resourceId: 'r2',
            title: 'Репетиция (Ежедн.)',
            rrule: 'FREQ=DAILY;DTSTART=20190601T013000Z;INTERVAL=1;BYDAY=MO,TU,WE,TH,FR',
            movable: false
        },
        {
            id: 4,
            start: '2019-06-07 11:00:00',
            end: '2019-06-07 13:00:00',
            resourceId: 'r3',
            title: 'Ревизор (Пн,Вт,Чт,Пт)',
            rrule: 'FREQ=WEEKLY;DTSTART=20190601T013000Z;BYDAY=MO,TU,TH,FR',
            startResizable: false,
        },
        {
            id: 5,
            start: '2019-06-07 09:00:00',
            end: '2019-06-07 10:15:00',
            resourceId: 'r4',
            title: 'Рояль (ежедн.)',
            rrule: 'FREQ=DAILY;DTSTART=20190601T013000Z;INTERVAL=1;BYDAY=MO,TU,WE,TH,FR',
            endResizable: false
        },
        {
            id: 51,
            start: '2019-06-07 12:00:00',
            end: '2019-06-07 16:00:00',
            resourceId: 'r4',
            title: 'Балет(Пн,Пт)',
            rrule: 'FREQ=WEEKLY;DTSTART=20190601T013000Z;BYDAY=MO,FR',
            endResizable: false
        },
        {
            id: 41,
            start: '2019-06-07 11:00:00',
            end: '2019-06-07 13:00:00',
            resourceId: 'r5',
            title: 'Русалка(Вт,Пт)',
            rrule: 'FREQ=WEEKLY;DTSTART=20190601T013000Z;BYDAY=TU,FR',
            startResizable: false,
        },
        {
            id: 42,
            start: '2019-06-07 10:00:00',
            end: '2019-06-07 12:00:00',
            resourceId: 'r6',
            title: 'Бал-маскарад (Пн,Пт)',
            rrule: 'FREQ=WEEKLY;DTSTART=20190601T013000Z;BYDAY=MO,FR',
            startResizable: false,
        }
    ],
    eventsForTaskView: [
        {
            id: 1,
            start: '2017-12-18 09:30:00',
            end: '2017-12-18 23:30:00',
            resourceId: 'r1',
            title: 'I am finished',
            bgColor: '#D9D9D9',
            groupId: 1,
            groupName: 'Task1'
        },
        {
            id: 2,
            start: '2017-12-18 12:30:00',
            end: '2017-12-26 23:30:00',
            resourceId: 'r2',
            title: 'I am not resizable',
            resizable: false,
            groupId: 2,
            groupName: 'Task2'
        },
        {
            id: 3,
            start: '2017-12-19 12:30:00',
            end: '2017-12-20 23:30:00',
            resourceId: 'r3',
            title: 'I am not movable',
            movable: false,
            groupId: 3,
            groupName: 'Task3'
        },
        {
            id: 7,
            start: '2017-12-19 15:40:00',
            end: '2017-12-20 23:30:00',
            resourceId: 'r7',
            title: 'I am exceptional',
            bgColor: '#FA9E95',
            groupId: 4,
            groupName: 'Task4'
        },
        {
            id: 4,
            start: '2017-12-20 14:30:00',
            end: '2017-12-21 23:30:00',
            resourceId: 'r4',
            title: 'I am not start-resizable',
            startResizable: false,
            groupId: 1,
            groupName: 'Task1'
        },
        {
            id: 5,
            start: '2017-12-21 15:30:00',
            end: '2017-12-22 23:30:00',
            resourceId: 'r5',
            title: 'I am not end-resizable',
            endResizable: false,
            groupId: 3,
            groupName: 'Task3'
        },
        {
            id: 9,
            start: '2017-12-21 16:30:00',
            end: '2017-12-21 23:30:00',
            resourceId: 'r1',
            title: 'R1 has many tasks',
            groupId: 4,
            groupName: 'Task4'
        },
        {
            id: 6,
            start: '2017-12-22 15:35:00',
            end: '2017-12-23 23:30:00',
            resourceId: 'r6',
            title: 'I am normal',
            groupId: 1,
            groupName: 'Task1'
        },
        {
            id: 8,
            start: '2017-12-25 15:50:00',
            end: '2017-12-26 23:30:00',
            resourceId: 'r1',
            title: 'I am locked',
            movable: false,
            resizable: false,
            bgColor: 'red',
            groupId: 1,
            groupName: 'Task1'
        },
        {
            id: 10,
            start: '2017-12-26 18:30:00',
            end: '2017-12-26 23:30:00',
            resourceId: 'r2',
            title: 'R2 has many tasks',
            groupId: 4,
            groupName: 'Task4'
        },
        {
            id: 11,
            start: '2017-12-27 18:30:00',
            end: '2017-12-27 23:30:00',
            resourceId: 'r14',
            title: 'R4 has many tasks',
            groupId: 4,
            groupName: 'Task4'
        },
        {
            id: 12,
            start: '2017-12-28 18:30:00',
            end: '2017-12-28 23:30:00',
            resourceId: 'r6',
            title: 'R6 has many tasks',
            groupId: 3,
            groupName: 'Task3'
        },
    ],
    eventsForCustomEventStyle: [
        {
            id: 1,
            start: '2017-12-18 09:30:00',
            end: '2017-12-19 23:30:00',
            resourceId: 'r1',
            title: 'I am finished',
            bgColor: '#D9D9D9',
            type: 1
        },
        {
            id: 2,
            start: '2017-12-18 12:30:00',
            end: '2017-12-26 23:30:00',
            resourceId: 'r2',
            title: 'I am not resizable',
            resizable: false,
            type: 2
        },
        {
            id: 3,
            start: '2017-12-19 12:30:00',
            end: '2017-12-20 23:30:00',
            resourceId: 'r3',
            title: 'I am not movable',
            movable: false,
            type: 3
        },
        {
            id: 4,
            start: '2017-12-19 14:30:00',
            end: '2017-12-20 23:30:00',
            resourceId: 'r4',
            title: 'I am not start-resizable',
            startResizable: false,
            type: 1
        },
        {
            id: 5,
            start: '2017-12-19 15:30:00',
            end: '2017-12-20 23:30:00',
            resourceId: 'r5',
            title: 'I am not end-resizable',
            endResizable: false,
            type: 2
        },
        {
            id: 6,
            start: '2017-12-19 15:35:00',
            end: '2017-12-19 23:30:00',
            resourceId: 'r6',
            title: 'I am normal',
            type: 3
        },
        {
            id: 7,
            start: '2017-12-19 15:40:00',
            end: '2017-12-20 23:30:00',
            resourceId: 'r7',
            title: 'I am exceptional',
            bgColor: '#FA9E95',
            type: 1
        },
        {
            id: 8,
            start: '2017-12-19 15:50:00',
            end: '2017-12-19 23:30:00',
            resourceId: 'r1',
            title: 'I am locked',
            movable: false,
            resizable: false,
            bgColor: 'red',
            type: 2
        },
        {
            id: 9,
            start: '2017-12-19 16:30:00',
            end: '2017-12-27 23:30:00',
            resourceId: 'r1',
            title: 'R1 has many tasks 1',
            type: 3
        },
        {
            id: 10,
            start: '2017-12-20 18:30:00',
            end: '2017-12-20 23:30:00',
            resourceId: 'r1',
            title: 'R1 has many tasks 2',
            type: 1
        },
        {
            id: 11,
            start: '2017-12-21 18:30:00',
            end: '2017-12-22 23:30:00',
            resourceId: 'r1',
            title: 'R1 has many tasks 3',
            type: 2
        },
        {
            id: 12,
            start: '2017-12-23 18:30:00',
            end: '2017-12-27 23:30:00',
            resourceId: 'r1',
            title: 'R1 has many tasks 4',
            type: 3
        },
    ],
}

export default DemoData
