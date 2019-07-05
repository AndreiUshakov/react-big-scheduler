import React, {Component} from 'react'
import {PropTypes} from 'prop-types' 
//import moment from 'moment'
//import 'moment/locale/zh-cn';
// import 'antd/lib/style/index.less';     //Add this code for locally example
import Scheduler, {SchedulerData, ViewTypes, DATE_FORMAT, DemoData, ResPlanner} from '../src/index'
import withDragDropContext from './withDnDContext'

class Basic extends Component{
    constructor(props){
        super(props);
        //stable
        //let schedulerData = new SchedulerData(new moment("2017-12-18").format(DATE_FORMAT), ViewTypes.Week); DD.MM.YYYY dd
        const newConf = {
            minuteStep: 60, 
            dayStartFrom: 9, 
            dayStopTo: 18, 
            nonAgendaDayCellHeaderFormat: "DD.MM.YYYY dd | HH:mm", 
            nonAgendaOtherCellHeaderFormat : "DD.MM.YYYY dd HH:mm",
            customCellWidth:100,
            customResourceTableWidth:220
        }
        let schedulerData = new SchedulerData(null, ViewTypes.Decade, false, false, true, newConf);
        schedulerData.localeMoment.locale('ru');
        schedulerData.setResources(DemoData.resources);
        schedulerData.setEvents(DemoData.events);
        this.state = {
            viewModel: schedulerData
        }
    }

    nonAgendaCellHeaderTemplateResolver = (schedulerData, item, formattedDateItems, style) => {
        let datetime = schedulerData.localeMoment(item.time);
        let isEvenDate = false;
        let isHolyday = false;
        let workingHoursNum = schedulerData.config.dayStopTo - schedulerData.config.dayStartFrom + 1;
        console.log(workingHoursNum);
        if (schedulerData.viewType !== ViewTypes.Day) {
            isEvenDate = datetime.date()%2 == 0;
            isHolyday = (datetime.day() == 6 || datetime.day() == 0);
        }
        
  
        if (isEvenDate) {
            style.backgroundColor = '#f2f2f2';
            //style.color = 'white';
        }
        if (isHolyday) {
            style.backgroundColor = '#fff2f2';
            style.color = 'red';
            //style.color = 'white';
        }

        const pList = formattedDateItems.map((item, index) => (
            <div key={index}>{item}</div>
        ));

        let cellDate=datetime.format("DD.MM.YYYY");
        let cellTime=datetime.format("HH:mm");

        if (formattedDateItems.length >= 2){
            cellDate = formattedDateItems[0];
            cellTime= formattedDateItems[1];
        }

        console.log("item",schedulerData, item, formattedDateItems, style);
        const headerIndex = schedulerData.headers.indexOf(item)%workingHoursNum;

        let elem = (
            <tr key={item.time} >
                <td data-resource-id={item.slotId} style={style}>
                    {cellTime}
                </td>
            </tr>);
        if (headerIndex == 0){
            elem = (
                <tr key={item.time} >
                    <td rowspan={workingHoursNum} style={style}>{cellDate}</td> 
                    <td data-resource-id={item.slotId} style={style}>
                        {cellTime}
                    </td>
                </tr>);
        }

        return elem;
                
            /*
            <th key={item.time} className={`header3-text`} style={style}>
                {
                    formattedDateItems.map((formattedItem, index) => (
                        <div key={index}
                             dangerouslySetInnerHTML={{__html: formattedItem.replace(/[0-9]/g, '<b>$&</b>')}}/>
                    ))
                }
            </th>*/
        
    }

    render(){
        const {viewModel} = this.state;
        return (
            <div>
                <div>
                    <div className="brand">
                    <div className="logo">
                        <img src="btlogo.png" />
                    </div>
                    <div className="brand-title">
                    <h1>Календари <br/>Большого <br/>Театра</h1>
                    
                    </div>
                    </div>
                    <ResPlanner schedulerData={viewModel}
                                prevClick={this.prevClick}
                                nextClick={this.nextClick}
                                onSelectDate={this.onSelectDate}
                                onViewChange={this.onViewChange}
                                eventItemClick={this.eventClicked}
                                viewEventClick={this.ops1}
                                viewEventText="Ops 1"
                                viewEvent2Text="Ops 2"
                                viewEvent2Click={this.ops2}
                                updateEventStart={this.updateEventStart}
                                updateEventEnd={this.updateEventEnd}
                                moveEvent={this.moveEvent}
                                newEvent={this.newEvent}
                                onScrollLeft={this.onScrollLeft}
                                onScrollRight={this.onScrollRight}
                                onScrollTop={this.onScrollTop}
                                onScrollBottom={this.onScrollBottom}
                                nonAgendaCellHeaderTemplateResolver = {this.nonAgendaCellHeaderTemplateResolver}
                                toggleExpandFunc={this.toggleExpandFunc}
                    />
                </div>
               
            </div>
        )
    }

    prevClick = (schedulerData)=> {
        schedulerData.prev();
        schedulerData.setEvents(DemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    nextClick = (schedulerData)=> {
        schedulerData.next();
        schedulerData.setEvents(DemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    onViewChange = (schedulerData, view) => {
        schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
        schedulerData.setEvents(DemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    onSelectDate = (schedulerData, date) => {
        schedulerData.setDate(date);
        schedulerData.setEvents(DemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    eventClicked = (schedulerData, event) => {
        alert(`You just clicked an event: {id: ${event.id}, title: ${event.title}}`);
    };

    ops1 = (schedulerData, event) => {
        alert(`You just executed ops1 to event: {id: ${event.id}, title: ${event.title}}`);
    };

    ops2 = (schedulerData, event) => {
        alert(`You just executed ops2 to event: {id: ${event.id}, title: ${event.title}}`);
    };

    newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
        if(confirm(`Do you want to create a new event? {slotId: ${slotId}, slotName: ${slotName}, start: ${start}, end: ${end}, type: ${type}, item: ${item}}`)){

            let newFreshId = 0;
            schedulerData.events.forEach((item) => {
                if(item.id >= newFreshId)
                    newFreshId = item.id + 1;
            });

            let newEvent = {
                id: newFreshId,
                title: 'New event you just created',
                start: start,
                end: end,
                resourceId: slotId,
                bgColor: 'purple'
            }
            schedulerData.addEvent(newEvent);
            this.setState({
                viewModel: schedulerData
            })
        }
    }

    updateEventStart = (schedulerData, event, newStart) => {
        if(confirm(`Do you want to adjust the start of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newStart: ${newStart}}`)) {
            schedulerData.updateEventStart(event, newStart);
        }
        this.setState({
            viewModel: schedulerData
        })
    }

    updateEventEnd = (schedulerData, event, newEnd) => {
        if(confirm(`Do you want to adjust the end of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newEnd: ${newEnd}}`)) {
            schedulerData.updateEventEnd(event, newEnd);
        }
        this.setState({
            viewModel: schedulerData
        })
    }

    moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
        if(confirm(`Do you want to move the event? {eventId: ${event.id}, eventTitle: ${event.title}, newSlotId: ${slotId}, newSlotName: ${slotName}, newStart: ${start}, newEnd: ${end}`)) {
            schedulerData.moveEvent(event, slotId, slotName, start, end);
            this.setState({
                viewModel: schedulerData
            })
        }
    }

    onScrollRight = (schedulerData, schedulerContent, maxScrollLeft) => {
        if(schedulerData.ViewTypes === ViewTypes.Day) {
            schedulerData.next();
            schedulerData.setEvents(DemoData.events);
            this.setState({
                viewModel: schedulerData
            });
    
            schedulerContent.scrollLeft = maxScrollLeft - 10;
        }
    }

    onScrollLeft = (schedulerData, schedulerContent, maxScrollLeft) => {
        if(schedulerData.ViewTypes === ViewTypes.Day) {
            schedulerData.prev();
            schedulerData.setEvents(DemoData.events);
            this.setState({
                viewModel: schedulerData
            });

            schedulerContent.scrollLeft = 10;
        }
    }

    onScrollTop = (schedulerData, schedulerContent, maxScrollTop) => {
        console.log('onScrollTop');
    }

    onScrollBottom = (schedulerData, schedulerContent, maxScrollTop) => {
        console.log('onScrollBottom');
    }

    toggleExpandFunc = (schedulerData, slotId) => {
        schedulerData.toggleExpandStatus(slotId);
        this.setState({
            viewModel: schedulerData
        });
    }
}

export default withDragDropContext(Basic)
