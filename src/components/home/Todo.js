import React from 'react'
import { observer, inject } from 'mobx-react'

@inject('store')
@observer
class Todo extends React.Component {
  render() {
    const { store, item } = this.props

    return (
      <li className="todo">
        <div className="view">
          <label>{item.text}</label>
          <button className="destroy" onClick={(e) => store.todos.remove(item)}/>
        </div>
      </li>
    )
  }
}

export default Todo
