import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const createFileValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).trim(),
    project_id: vine.number(),
  })
)

export const modifyFileValidator = vine.compile(
  vine.object({
    id: vine.number(),
    name: vine.string().minLength(3).trim(),
  })
)

export const deleteFileValidator = vine.compile(
  vine.object({
    id: vine.number(),
  })
)

createFileValidator.messagesProvider = new SimpleMessagesProvider({
  'name.required': 'A név megadása kötelező',
  'name.string': 'A névnek szövegnek kell lennie',
  'name.minLength': 'A névnek tartalmaznia kell minimum {{ min }} karaktert',
  'project_id.required': 'A projekt megadása kötelező',
})

modifyFileValidator.messagesProvider = new SimpleMessagesProvider({
  'id.required': 'Az azonosító megadása kötelező',
  'id.number': 'Az azonosítónak számnak kell lennie',
  'name.string': 'A névnek szövegnek kell lennie',
  'name.minLength': 'A névnek tartalmaznia kell minimum {{ min }} karaktert',
})

deleteFileValidator.messagesProvider = new SimpleMessagesProvider({
  'id.required': 'Az azonosító megadása kötelező',
  'id.number': 'Az azonosítónak számnak kell lennie',
})
