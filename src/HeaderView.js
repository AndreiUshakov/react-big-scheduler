import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import {CellUnits} from './index'

class HeaderView extends Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        schedulerData: PropTypes.object.isRequired,
        nonAgendaCellHeaderTemplateResolver : PropTypes.func,
        contentScrollbarHeight: PropTypes.number.isRequired
    }

    render() {
        const {schedulerData, nonAgendaCellHeaderTemplateResolver, contentScrollbarHeight} = this.props;
        const {headers, cellUnit, config, localeMoment} = schedulerData;
        let headerHeight = schedulerData.getTableHeaderHeight();
        let cellWidth = schedulerData.getContentCellWidth();
        let minuteStepsInHour = schedulerData.getMinuteStepsInHour();

        let headerList = [];
        let style = {};
        if(cellUnit === CellUnits.Hour){
            headers.forEach((item, index) => {
                if(index % minuteStepsInHour === 0){
                    let datetime = localeMoment(item.time);
                    const isCurrentTime = datetime.isSame(new Date(), 'hour');

                    style = !!item.nonWorkingTime ? {width: cellWidth*minuteStepsInHour, color: config.nonWorkingTimeHeadColor, backgroundColor: config.nonWorkingTimeHeadBgColor} : {width: cellWidth*minuteStepsInHour};

                    if(index === headers.length - minuteStepsInHour)
                        style = !!item.nonWorkingTime ? {color: config.nonWorkingTimeHeadColor, backgroundColor: config.nonWorkingTimeHeadBgColor} : {};

                    let pFormattedList = config.nonAgendaDayCellHeaderFormat.split('|').map(item => datetime.format(item));
                    let element;

                    if (typeof nonAgendaCellHeaderTemplateResolver === 'function') {
                        element = nonAgendaCellHeaderTemplateResolver(schedulerData, item, pFormattedList, style)
                    }
                    else {
                        const pList = pFormattedList.map((item, index) => (
                            <div key={index}>{item}</div>
                        ));

                        element = (
                            <th key={item.time} className="header3-text" style={style}>
                                <div>
                                    {pList}
                                </div>
                            </th>
                        );
                    }

                    headerList.push(element);
                }
            })
        }
        else {
            headerList = headers.map((item, index) => {
                let datetime = localeMoment(item.time);
                style = !!item.nonWorkingTime ? {width: cellWidth, color: config.nonWorkingTimeHeadColor, backgroundColor: config.nonWorkingTimeHeadBgColor} : {width: cellWidth};
                if(index === headers.length - 1)
                    style = !!item.nonWorkingTime ? {color: config.nonWorkingTimeHeadColor, backgroundColor: config.nonWorkingTimeHeadBgColor} : {};

                let pFormattedList = config.nonAgendaOtherCellHeaderFormat.split('|').map(item => datetime.format(item));

                if (typeof nonAgendaCellHeaderTemplateResolver === 'function') {
                    return nonAgendaCellHeaderTemplateResolver(schedulerData, item, pFormattedList, style)
                }

                const pList = pFormattedList.map((item, index) => (
                    <div key={index}>{item}</div>
                ));

                return (
                    <th key={item.time} className="header3-text" style={style}>
                        <div>
                            {pList}
                        </div>
                    </th>
                );
            });
        }

        return (
            <thead>
                <tr style={{height: headerHeight}}>
                    {headerList}
                </tr>
            </thead>
        );
    }
}

export class PlannerTimeLineView extends HeaderView{
    constructor(props){
        super(props)
    }

    render() {
        const {schedulerData, nonAgendaCellHeaderTemplateResolver} = this.props;
        const {headers, cellUnit, config, localeMoment} = schedulerData;
        let headerHeight = schedulerData.getTableHeaderHeight();
        let cellWidth = schedulerData.getContentCellWidth();
        let minuteStepsInHour = schedulerData.getMinuteStepsInHour();

        let headerList = [];
        let style = {};
        if(cellUnit === CellUnits.Hour){
            headers.forEach((item, index) => {
                if(index % minuteStepsInHour === 0){
                    let datetime = localeMoment(item.time);
                    const isCurrentTime = datetime.isSame(new Date(), 'hour');

                    style = !!item.nonWorkingTime ? {width: cellWidth*minuteStepsInHour, color: config.nonWorkingTimeHeadColor, backgroundColor: config.nonWorkingTimeHeadBgColor} : {width: cellWidth*minuteStepsInHour};

                    if(index === headers.length - minuteStepsInHour)
                        style = !!item.nonWorkingTime ? {color: config.nonWorkingTimeHeadColor, backgroundColor: config.nonWorkingTimeHeadBgColor} : {};

                    let pFormattedList = config.nonAgendaDayCellHeaderFormat.split('|').map(item => datetime.format(item));
                    console.log(config.nonAgendaDayCellHeaderFormat, pFormattedList);
                    let element;

                    if (typeof nonAgendaCellHeaderTemplateResolver === 'function') {
                        element = nonAgendaCellHeaderTemplateResolver(schedulerData, item, pFormattedList, style)
                    }
                    else {
                        const pList = pFormattedList.map((item, index) => (
                            <div key={index}>{item}</div>
                        ));

                        element = (
                            <tr key={item.time} >
                                <td>
                                    
                                </td>
                                <td data-resource-id={item.slotId} style={style}>
                                    {pList}
                                </td>
                            </tr>
                            
                        );
                        
                        /*element = (
                            <th key={item.time} className="header3-text" style={style}>
                                <div>
                                    {pList}
                                </div>
                            </th>
                        );*/
                    }

                    headerList.push(element);
                }
            })
        }
        else {
            headerList = headers.map((item, index) => {
                let datetime = localeMoment(item.time);
                
                let pFormattedList = config.nonAgendaOtherCellHeaderFormat.split('|').map(item => datetime.format(item));
                console.log(item);
                

                const pList = pFormattedList.map((item, index) => (
                    <div>{item}</div>
                ));

                return (
                    <tr key={item.time} >
                        <td data-resource-id={item.slotId} >
                            {pList}
                        </td>
                    </tr>
                );
            });
        }

        return (
            <div style={{paddingBottom: this.props.contentScrollbarHeight}}>
                <table className="resource-table">
                    <tbody>
                        {headerList}
                    </tbody>
                </table>
            </div>
        );
    }

}
export default HeaderView
