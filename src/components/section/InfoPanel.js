import React, {Component} from 'react';

class InfoPanel extends Component {

    constructor(props) {
        super(props);
        this.onClickRow = this.onClickRow.bind(this, this.props.content.id);
    }

    onClickRow(itemsId) {
        this.props.onSelectElement(itemsId);
    }

    render() {
        return (
            <div
                className='infoPanelList'
                onClick={() => this.onClickRow(this.props.content.id)}
            >
                <div>
                    <span><b>Id:</b></span>
                    <span>{this.props.content.id}</span>
                </div>
                <div>
                    <span><b>Status:</b></span>
                    <span>{this.props.content.status}</span>
                </div>
                <div>
                    <span><b>Shape:</b></span>
                    <span>{this.props.content.itemStyle.shape}</span>
                </div>
            </div>
        )
    }
}

export default InfoPanel
