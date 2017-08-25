import state from './State'

export default class Todos {

  constructor(request) {
    this.request = request
  }

  async add(text) {
    const result = await this.request.post(`api/todos/add`, { text })
    state.todos.push(result)
  }

  async remove(item) {
    try {
      await this.request.post(`api/todos/remove`, { _id: item._id })
      state.todos.remove(item)
    } catch(err) {
      console.error(err)
    }
  }

  async browse() {
    state.todos = await this.request.get(`api/todos`)
    return state.todos // return so we can chain with onEnter
  }
}
