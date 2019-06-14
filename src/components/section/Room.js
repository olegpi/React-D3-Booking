import React, {Component} from 'react'
import {select, event} from 'd3-selection'
// import { scaleLinear } from 'd3-scale'
// import { brushX } from 'd3-brush'
// import { axisBottom } from 'd3-axis'

class Room extends Component {
    constructor(props) {
        super(props);
        this.createRoom = this.createRoom.bind(this);
    }

    getSvgWidth() {
        const w = this.props.parentWidth;
        return `${w}px`;
    }

    getSvgHeight() {
        // k - coefficient (Width/Height)
        const k = 2;
        const h = this.props.parentWidth / k
        return `${h.toString()}px`;
    }

    getNewPosition(valX, shift, direction) {
        let res = 0;
        direction === '+' ? res = Number(valX) + Number(shift) : res = Number(valX) - Number(shift);
        return res;
    }

    getStatusColor(status) {
        let color = null;
        switch (status) {
            case 'busy':
                color = '#FF4500';
                break
            case 'booking':
                color = '#FFFF66';
                break;
            case 'free':
                color = '#32CD32';
                break;
            default:
                color = '#CCCCCC';
        }

        return color;
    }

    getSelectedElementStyle(selected) {
        let color = '';
        if (selected) {
            color = '#000000';
        }
        return color;
    }

    componentDidMount() {
        this.createRoom()
    }

    componentDidUpdate() {
        this.createRoom()
    }

    createRoom() {
        const node = this.node
        select(node)
            .append('g')
            .attr('class', 'room');

        select(node)
            .select('g.room')
            .append('rect')
            .attr('width', this.props.parentWidth)
            .attr('height', this.props.parentHeight)
            .attr('fill', 'pink');

        /*select(node)
            .select("g.block")
                .selectAll('rect')
                .exit()
                .remove();	*/

        (this.props.items).map(item => {
            switch (item.itemStyle.shape) {
                case 'circle':
                    /*select(node)
                        .select('g.block')
                            .selectAll(item.itemStyle.shape)
                            .data([item.itemStyle.id])
                            .exit()
                            .remove()*/

                    select(node)
                        .select('g.room')
                        .data([item.id])
                        .append(item.itemStyle.shape)
                        .on('click', this.props.onSelectElement)
                        .attr('id', item.id)
                        .attr('cx', item.itemStyle.positionX)
                        .attr('cy', item.itemStyle.positionY)
                        .attr('r', item.itemStyle.radius)
                        .attr('stroke-width','3')
                        .style('stroke', this.getSelectedElementStyle(item.selected))
                        .style('fill', this.getStatusColor(item.status))
                        .style('cursor', 'pointer');

                    select(node)
                        .select('g.room')
                        .append('text')
                        .attr('x', this.getNewPosition(item.itemStyle.positionX, 0, '+'))
                        .attr('y', this.getNewPosition(item.itemStyle.positionY, 0, '+'))
                        .attr('text-anchor', 'middle')
                        .style('font-size', '20px')
                        .style('fill', '#000000')
                        .text(item.id);
                    break;
                case 'rect':
                    /*select(node)
                        .select('g.block')
                            .selectAll(item.itemStyle.shape)
                            .data([item.itemStyle.id])
                            .exit()
                            .remove()*/

                    select(node)
                        .select('g.room')
                        .data([item.id])
                        .append(item.itemStyle.shape)
                        .on('click', this.props.onSelectElement)
                        .attr('id', item.id)
                        .attr('x', item.itemStyle.positionX)
                        .attr('y', item.itemStyle.positionY)
                        .attr('width', item.itemStyle.width)
                        .attr('height', item.itemStyle.height)
                        .attr('stroke-width','3')
                        .style('stroke', this.getSelectedElementStyle(item.selected))
                        .style('fill', this.getStatusColor(item.status))
                        .style('cursor', 'pointer');

                    select(node)
                        .select('g.room')
                        .append('text')
                        .attr('x', this.getNewPosition(item.itemStyle.positionX, item.itemStyle.width / 2, '+'))
                        .attr('y', this.getNewPosition(item.itemStyle.positionY, item.itemStyle.height / 2, '+'))
                        .attr('text-anchor', 'middle')
                        .style('font-size', '20px')
                        .style('fill', '#000000')
                        .text(item.id);
                    break;
            }

        });
    }

    render() {
        if (this.props.parentWidth && this.props.parentHeight) {
            return <svg
                ref={node => this.node = node}
                width='100%'
                height='100%'
            ></svg>
        }

        return <div>Loading ...</div>
    }
}

export default Room
