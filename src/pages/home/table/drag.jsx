import React, { Component } from 'react'
import { Table } from 'antd'
import { DndProvider, DragSource, DropTarget } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper'

let dragingIndex = -1

class BodyRow extends React.Component {

  render() {
    const { isOver, connectDragSource, connectDropTarget, moveRow, ...restProps } = this.props
    const style = { ...restProps.style, cursor: 'move',  }

    let { className } = restProps
    if (isOver) {
      if (restProps.index > dragingIndex) {
        // className += ' drop-over-downward' // 因为使用了styles，所以不生效
      }
      if (restProps.index < dragingIndex) {
        // className += ' drop-over-upward'
      }
    }

    return connectDragSource(
      connectDropTarget(<tr {...restProps} className={className} style={style} />),
    )
  }
}

const rowSource = {
  beginDrag(props) {
    dragingIndex = props.index
    return {
      index: props.index,
    }
  },
}

const rowTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index

    if (dragIndex === hoverIndex) {
      return
    }

    props.moveRow(dragIndex, hoverIndex)

    monitor.getItem().index = hoverIndex
  },
}

const DragableBodyRow = DropTarget('row', rowTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
}))(
  DragSource('row', rowSource, connect => ({
    connectDragSource: connect.dragSource(),
  }))(BodyRow),
)

export default class Index extends Component {

  components = {
    body: {
      row: DragableBodyRow,
    },
  }

  moveRow = (dragIndex, hoverIndex) => {
    const { list, handleDragResult } = this.props
    const dragRow = list[dragIndex]

    // list.splice(dragIndex, 1)
    // list.splice(hoverIndex, 0, dragRow)
    // handleDragResult(list)

    // 效果同上注释
    const res = update(this.props, {
      list: {
        $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]],
      },
    })
    handleDragResult(res.list)
  }


  render() {
    const { list, columns } = this.props

    return (
      <DndProvider backend={HTML5Backend}>
        <Table
          rowKey='id'
          style={{background: '#fff'}}
          columns={columns}
          dataSource={list}
          components={this.components}
          onRow={(record, index) => ({
            index,
            moveRow: this.moveRow,
          })}
          pagination={false}
        />
      </DndProvider>
    )
  }
}
