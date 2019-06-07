import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import Icon from 'antd/lib/icon'

class ResourceView extends Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        schedulerData: PropTypes.object.isRequired,
        contentScrollbarHeight: PropTypes.number,
        slotClickedFunc: PropTypes.func,
        slotItemTemplateResolver: PropTypes.func,
        toggleExpandFunc: PropTypes.func
    }

    render() {

        const {schedulerData, contentScrollbarHeight, slotClickedFunc, slotItemTemplateResolver, toggleExpandFunc} = this.props;
        const {renderData} = schedulerData;

        let width = schedulerData.getResourceTableWidth() - 2;
        let paddingBottom = contentScrollbarHeight;
        let displayRenderData = renderData.filter(o => o.render);
        let resourceList = displayRenderData.map((item) => {
            let indents = [];
            for(let i=0;i<item.indent;i++) {
                indents.push(<span key={`es${i}`} className="expander-space"></span>);
            }
            let indent = <span key={`es${item.indent}`} className="expander-space"></span>;
            if(item.hasChildren) {
                indent = item.expanded ? (
                    <Icon type="minus-square" key={`es${item.indent}`} style={{}} className=""
                        onClick={() => {
                            if(!!toggleExpandFunc)
                                toggleExpandFunc(schedulerData, item.slotId);
                        }}/>
                ) : (
                    <Icon type="plus-square" key={`es${item.indent}`} style={{}} className=""
                        onClick={() => {
                            if(!!toggleExpandFunc)
                                toggleExpandFunc(schedulerData, item.slotId);
                        }}/>
                );
            }
            indents.push(indent);
                    
            let a = slotClickedFunc != undefined ? <span className="slot-cell">{indents}<a className="slot-text" onClick={() => {
                slotClickedFunc(schedulerData, item);
            }}>{item.slotName}</a></span>
                : <span className="slot-cell">{indents}<span className="slot-text">{item.slotName}</span></span>;
            let slotItem = (
                <div title={item.slotName} className="overflow-text header2-text" style={{textAlign: "left"}}>
                    {a}
                </div>
            );
            if(!!slotItemTemplateResolver) {
                let temp = slotItemTemplateResolver(schedulerData, item, slotClickedFunc, width, "overflow-text header2-text");
                if(!!temp)
                    slotItem = temp;
            }

            let tdStyle = {height: item.rowHeight};
            if(item.groupOnly) {
                tdStyle = {
                    ...tdStyle,
                    backgroundColor: schedulerData.config.groupOnlySlotColor
                };
            }

            return (
                <tr key={item.slotId}>
                    <td data-resource-id={item.slotId} style={tdStyle}>
                        {slotItem}
                    </td>
                </tr>
            );
        });

        return (
            <div style={{paddingBottom: paddingBottom}}>
                <table className="resource-table">
                    <tbody>
                        {resourceList}
                    </tbody>
                </table>
            </div>
        )
    }
}

export class PlanerResorceView extends ResourceView{
    constructor(props){
        super(props)
    }
    render() {

        const {schedulerData, contentScrollbarHeight, slotClickedFunc, slotItemTemplateResolver, toggleExpandFunc} = this.props;
        //const {renderData} = schedulerData.renderData;

        let width = schedulerData.getResourceTableWidth() - 2;
        //("width", width);
        let headerHeight = schedulerData.getTableHeaderHeight();
        let paddingBottom = contentScrollbarHeight;
        let displayRenderData = schedulerData.renderData.filter(o => o.render);
        //console.log(displayRenderData);
        let resourceList = displayRenderData.map((item) => {
            /*
            if(item.hasChildren) {
                indent = item.expanded ? (
                    <Icon type="minus-square" key={`es${item.indent}`} style={{}} className=""
                        onClick={() => {
                            if(!!toggleExpandFunc)
                                toggleExpandFunc(schedulerData, item.slotId);
                        }}/>
                ) : (
                    <Icon type="plus-square" key={`es${item.indent}`} style={{}} className=""
                        onClick={() => {
                            if(!!toggleExpandFunc)
                                toggleExpandFunc(schedulerData, item.slotId);
                        }}/>
                );
            }
            */
                    
            let slotItem = (
                    <span>{item.slotName}</span>
            );
            if(!!slotItemTemplateResolver) {
                let temp = slotItemTemplateResolver(schedulerData, item, slotClickedFunc, width, "overflow-text header2-text");
                if(!!temp)
                    slotItem = temp;
            }

            let tdStyle = {height: item.rowHeight};
            if(item.groupOnly) {
                tdStyle = {
                    ...tdStyle,
                    backgroundColor: schedulerData.config.groupOnlySlotColor
                };
            }

            return (
                <th key={item.slotId} className="header3-text" >
                    {slotItem}
                </th>
                /*
                <tr key={item.slotId}>
                    <td data-resource-id={item.slotId} style={tdStyle}>
                        {slotItem}
                    </td>
                </tr>*/
            );
        });

        return (
            <thead>
                <tr >
                    {resourceList}
                </tr>
            </thead>
            /*<div style={{paddingBottom: paddingBottom}}>
                <table className="resource-table">
                    <tbody>
                        {resourceList}
                    </tbody>
                </table>
            </div>*/
        )
    }

}
export default ResourceView