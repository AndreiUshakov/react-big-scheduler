import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import moment from 'moment'


class BodyView extends Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        schedulerData: PropTypes.object.isRequired,
    }

    render() {

        const {schedulerData} = this.props;
        const {renderData, headers, config, behaviors} = schedulerData;
        let cellWidth = schedulerData.getContentCellWidth();

        let displayRenderData = renderData.filter(o => o.render);
        let tableRows = displayRenderData.map((item) => {
            let rowCells = headers.map((header, index) => {
                let key = item.slotId + '_' + header.time;
                let style = index === headers.length - 1 ? {} : {width: cellWidth};
                if(!!header.nonWorkingTime)
                    style = {...style, backgroundColor: config.nonWorkingTimeBodyBgColor};
                if(item.groupOnly)
                    style = {...style, backgroundColor: config.groupOnlySlotColor};
                if(!!behaviors.getNonAgendaViewBodyCellBgColorFunc){
                    let cellBgColor = behaviors.getNonAgendaViewBodyCellBgColorFunc(schedulerData, item.slotId, header);
                    if(!!cellBgColor)
                        style = {...style, backgroundColor: cellBgColor};
                }
                return (
                    <td key={key} style={style}><div></div></td>
                )
            });

            return (
                <tr key={item.slotId} style={{height: item.rowHeight}}>
                    {rowCells}
                </tr>
            );
        });

        return (
            <tbody>
                {tableRows}
            </tbody>
        );
    }
}

export class PlannerBodyView extends BodyView{
    constructor(props){
        super(props)
    }

    render() {
        console.log("titlesize", this.state);
        const {schedulerData} = this.props;
        console.log("schedulerData",schedulerData);
        const {renderData, headers, config, behaviors} = schedulerData;
        let cellWidth = schedulerData.getContentCellWidth();
        let displayRenderData = renderData.filter(o => o.render);
        console.log(headers, displayRenderData);

        let tableRows = headers.map((item) => {
            let rowCells = displayRenderData.map((resource, index) => {
                let key =  item.time + '_' + resource.slotId;

                let currentCellEvents = schedulerData.events
                    .filter(ev=>ev.resourceId == resource.slotId && 
                        ev.start == item.time)
                    .map(ev=> {
                        const heightArea = moment.duration(moment(ev.end)-moment(ev.start)).asMinutes() /15 * 7;
                        const h = {height: `${heightArea}px`, backgroundColor:resource.slotBgColor, borderRadius:"6px" };
                        const tStart = moment(ev.start).format("HH:mm");
                        const tEnd = moment(ev.end).format("HH:mm");
                        const f = {fontSize:`${schedulerData.titlesize}px`}
                        return (
                            <a className="timeline-event event-area" draggable="true" >
                                <div style={h}>
                                    <span className="time-pad"> 
                                        <span className="time-cell">{tStart}</span>
                                        <span className="time-cell">{tEnd}</span>
                                    </span>
                                    <span className="title-pad" style={f}>{ev.title}</span>                                    
                                </div>
                            </a>)});

                //console.log("resource" , currentCellEvents);
                //let headersWithEvents = resource.headerItems.filter(header => header.count>0).map(header=>header.time + "_" + resource.slotId);
                let headersWithEvents = resource.headerItems
                    .filter(header => header.count>0)
                    .map(header=>({
                        key: header.time + "_" + resource.slotId,
                        eventData: header.events[0],
                        span: header.events[0].span,
                        startEvent: header.events[0].eventItem.start,
                        endEvent: header.events[0].eventItem.end,
                        titleEvent: header.events[0].eventItem.title,                        
                    }));
                //console.log(headersWithEvents);
                let cssClass = "empty"
                if (headersWithEvents.filter(ev=> ev.key==key).length >0 ){
                    cssClass = "occupied " + resource.slotId;
                    
                    //style = {backgroundColor: resource.}
                }
                //let style = index === headers.length - 1 ? {} : {width: cellWidth};
                /*
                if(!!header.nonWorkingTime)
                    style = {...style, backgroundColor: config.nonWorkingTimeBodyBgColor};
                if(item.groupOnly)
                    style = {...style, backgroundColor: config.groupOnlySlotColor};
                if(!!behaviors.getNonAgendaViewBodyCellBgColorFunc){
                    let cellBgColor = behaviors.getNonAgendaViewBodyCellBgColorFunc(schedulerData, item.slotId, header);
                    if(!!cellBgColor)
                        style = {...style, backgroundColor: cellBgColor};
                }*/
                

                return (
                    <td key={key} className={cssClass}>                        
                        <div className="delimeters15min">{currentCellEvents}&#32;</div>
                        <div className="delimeters15min">&#32;</div>
                        <div className="delimeters15min">&#32;</div>
                        <div className="delimeters15minlast">&#32;</div>
                    </td>
                )
            });

            return (
                <tr  >
                    {rowCells}
                </tr>
            );
        });

        /*let tableRows = displayRenderData.map((item) => {
            let rowCells = headers.map((header, index) => {
                let key = item.slotId + '_' + header.time;
                let style = index === headers.length - 1 ? {} : {width: cellWidth};
                if(!!header.nonWorkingTime)
                    style = {...style, backgroundColor: config.nonWorkingTimeBodyBgColor};
                if(item.groupOnly)
                    style = {...style, backgroundColor: config.groupOnlySlotColor};
                if(!!behaviors.getNonAgendaViewBodyCellBgColorFunc){
                    let cellBgColor = behaviors.getNonAgendaViewBodyCellBgColorFunc(schedulerData, item.slotId, header);
                    if(!!cellBgColor)
                        style = {...style, backgroundColor: cellBgColor};
                }
                return (
                    <td key={key} style={style}><div></div></td>
                )
            });

            return (
                <tr key={item.slotId} style={{height: item.rowHeight}}>
                    {rowCells}
                </tr>
            );
        });*/

        return (
            <tbody>
                {tableRows}
            </tbody>
        );
    }

}


export default BodyView