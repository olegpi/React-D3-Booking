import React, {Component} from 'react';
import Room from '../section/Room';
import InfoPanel from '../section/InfoPanel';
import FilterPanel from '../section/FilterPanel';

class Body extends Component {
    constructor(props) {
        super(props)
        this.state = {
            svgWidth: 720,
            svgHeight: 360,
            items: null,
            selectState: null,
            selectID: null,
        }
        this.onFilterReset = this.onFilterReset.bind(this)
    }

    componentDidMount() {
        fetch('http://localhost:3001/posts')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    items: data[0].data
                });
            });
    }

    /*******************************/
    onSelectElement = (id) => {
        this.onFilterReset();
        let selectElement = this.state.items
        selectElement.map(item => {
            item.selected = false;
            if (id === item.id) {
                item.selected = true;

                this.setState({selectID: id})
            }
        });

        this.setState({items: selectElement});
    }

    renderRows() {
        let list = this.state.items || [];
        if (this.state.selectState) {
            list = (this.state.items).filter(item => {
                item.selected = false;
                return item.status === this.state.selectState;
            })
        }
        if (this.state.selectID) {
            list = (this.state.items).filter(item => {
                return item.id === this.state.selectID;
            })
        }
        return (
            list.map((item) => {
                if (this.state.selectState) {
                    item.selected = true;
                }
                return (
                    <InfoPanel
                        key={item.id}
                        content={item}
                        onSelectElement={this.onSelectElement}
                    />
                )
            })
        )
    }

    /*******************************/
    onClickFilter = (filter) => {
        this.setState({selectID: null});
        this.setState({selectState: filter});
    }

    uniqStatus() {
        let list = [];
        (this.state.items).map((item) => {
            if (list.indexOf(item.status) === -1) {
                list.push(item.status);
            }
        });

        return list;
    }

    renderFilter() {
        let list = this.uniqStatus() || [];
        return (
            list.map((item, index) => {
                return (
                    <FilterPanel
                        key={index}
                        content={item}
                        onClickFilter={this.onClickFilter}
                    />
                )

            })
        )
    }

    /*******************************/
    onFilterReset() {
        this.setState({selectState: null});
        this.setState({selectID: null});
        (this.state.items).map((item) => {
            item.selected = false;
        });
    }

    render() {
        if (this.state.items) {
            return (
                <div className="section">
                    <div className="container">
                        <div className="row">
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 svgBlock">
                                <Room
                                    onSelectElement={this.onSelectElement}
                                    parentWidth={this.state.svgWidth}
                                    parentHeight={this.state.svgHeight}
                                    items={this.state.items}
                                />
                            </div>
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 listBlock">
                                <div className="row">
                                    <div className="col-6">
                                        {this.renderFilter()}
                                    </div>
                                    <div className="col-6 right">
                                        <button onClick={this.onFilterReset}>reset</button>
                                    </div>
                                </div>
                                {this.renderRows()}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div className="section">
                <div className="container">
                    <div className="row">
                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 svgBlock">
                            <div>Loading ..</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Body;
