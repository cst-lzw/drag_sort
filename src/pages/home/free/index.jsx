import React, { Component } from 'react'

import Drag from './drag'

export default class Index extends Component {
    state = {
        list: [
            { id: 0, title: 'box 1' },
            { id: 1, title: 'box 2' },
            { id: 2, title: 'box 3' }
        ]
    }

    handleDragResult = list => {
        this.setState({
            list
        })
    }


    render() {
        const { list } = this.state
        return (
            <div>
                <Drag
                    list={list}
                    handleDragResult={this.handleDragResult}
                />
            </div>
        )
    }
}
