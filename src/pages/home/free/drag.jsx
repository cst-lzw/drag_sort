import React, { Component } from 'react'
import { DndProvider, DragSource, DropTarget } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import styles from './index.less'

// 被拖拽的项
const source = {
    // 开始拖拽时触发，返回值可在 endDrag 的 monitor.getItem() 获取
    beginDrag (props) {
        // console.log('开始拖拽，被拖拽的项：', props.item)
        return {
            index: props.index // 被拖拽的项在 list 中的索引
        }
    },
    // 结束拖拽时触发
    endDrag (props, monitor) {
        // 当前拖拽的 item 组件
        const item = monitor.getItem()
        // console.log('结束拖拽', item)
    }
}

// 拖拽目的项
const target = {
    drop (props, monitor) {
        const dragIndex = monitor.getItem().index // 被拖拽前的位置
        const hoverIndex = props.index // 拖拽悬浮的位置，即拖拽后的位置
        if (dragIndex === hoverIndex) { // 拖拽位置不变
            return
        }
        props.handleMove(dragIndex, hoverIndex)
    }
}

const DraggableDiv = props => {
    const { connectDragSource, connectDropTarget, item, index } = props
    return (
        connectDragSource(connectDropTarget(
            <div className={styles.dragItem}>{item.title}</div>
        ))
    )
}

const DraggableBox = (
    DragSource('drag', source, (connect, monitor) => ({
        connectDragSource: connect.dragSource()
    }))
)(
    DropTarget('drag', target, (connect, monitor) => ({
        connectDropTarget: connect.dropTarget()
    }))(DraggableDiv)
)

export default class Drag extends Component {

    // 拖拽结束时的数据处理
    handleMove = (dragIndex, hoverIndex) => {
        const { list, handleDragResult } = this.props
        const temp = list[dragIndex]
        if (dragIndex > hoverIndex) { // 向前移
            for(let i = dragIndex; i > hoverIndex; i--) {
                list[i] = list[i - 1]
            }
        } else { // 向后移
            for (let i = dragIndex; i < hoverIndex; i++) {
                list[i] = list[i + 1]
            }
        }
        list[hoverIndex] = temp
        handleDragResult(list)
    }

    render() {
        const { list } = this.props
        return (
            <div className={styles.dragWrapper}>
                <DndProvider backend={HTML5Backend}>
                    {
                        list.map((item, index) => (
                            <DraggableBox
                                key={item.id}
                                item={item}
                                index={index} // 必要，拖拽结束时的index判断依赖
                                handleMove={this.handleMove}
                            />
                        ))
                    }
                </DndProvider>
            </div>
        )
    }
}
