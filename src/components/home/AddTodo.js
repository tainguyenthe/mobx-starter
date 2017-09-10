import React from 'react'
import { observable } from 'mobx'
import { observer, inject } from 'mobx-react'

@inject('store')
@observer
class AddTodo extends React.Component {

  @observable inputText = ''

  handleSubmit = (e) => {
    e.preventDefault()
    const { store } = this.props
    store.todos.add(this.inputText).then(() => {
      // Clear input text on sucess
      this.inputText = ''
    })
  }

  handleChange = (e) => {
    this.inputText = e.target.value
  }

  render() {
    return (
      <form className="header" onSubmit={this.handleSubmit}>
        <p>
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            value={this.inputText}
            onChange={this.handleChange}
          />
        </p>
      </form>
    )
  }
}

export default AddTodo
