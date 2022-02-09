import React, { Component } from 'react'

import Drag from './drag'

import { Table } from 'antd'

export default class Index extends Component {
  state = {
    list: [
      { id: 1, title: 'first' },
      { id: 2, title: 'second' },
      { id: 3, title: 'third' },
    ],
    columns: [
      {
        title: "ID",
        dataIndex: 'id',
      },
      {
        title: "Title",
        dataIndex: 'title',
      },
    ]
  }

  handleDragResult = list => {
    this.setState({
      list
    })
  }


  render() {
    const { list, columns } = this.state

    return (
      <div>
        <Drag
          list={list}
          columns={columns}
          handleDragResult={this.handleDragResult}
        />
      </div>
    )
  }
}
