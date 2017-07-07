/**
 * @class Todods
 */
export default (state, request) => {
  return new class Todos {

    async add(text) {
      const result = await request.post(`api/todos/add`, { text })
      state.todos.push(result)
    }

    async remove(item) {
      try {
        await request.post(`api/todos/remove`, { _id: item._id })
        state.todos.remove(item)
      } catch(err) {
        console.error(err)
      }
    }

    async browse() {
      state.todos = await request.get(`api/todos`)
    }
  }
}
