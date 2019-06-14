import React, {Component} from 'react';

class FilterPanel extends Component {

    constructor(props) {
        super(props);
        this.onClickFilterButton = this.onClickFilterButton.bind(this, this.props.content);
    }

    onClickFilterButton(status) {
        this.props.onClickFilter(status);
    }

    render() {
        return (
            <button
                onClick={() => this.onClickFilterButton(this.props.content)}
            >
                {this.props.content}
            </button>
        )
    }
}

export default FilterPanel
