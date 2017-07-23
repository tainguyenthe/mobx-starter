import Todo from '../models/Todo'

export async function getTodos(ctx) {

  if (!ctx.account.id) {
    ctx.body = []
    return
  }

  const response = await Todo.find({
    createdBy: ctx.account
  }).limit(50).exec()

  ctx.body = response
}

export async function addTodos(ctx) {
  const { text } = ctx.request.fields

  if (!text) throw new Exception('[text] not provided')

  const newTodo = new Todo({
    text,
    createdBy: ctx.account
  })
  const response = await newTodo.save()

  ctx.body = response
}

export async function removeTodos(ctx) {
  const { _id } = ctx.request.fields

  if (!_id) throw new Exception('[_id] not provided')

  const response = await Todo.remove({ _id })

  ctx.body = response ? { success: true } : { success: false }
}
