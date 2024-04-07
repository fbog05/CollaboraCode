import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const createProjectValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).trim(),
    owner_id: vine.number(),
  })
)

export const modifyProjectValidator = vine.compile(
  vine.object({
    id: vine.number(),
    name: vine.string().minLength(3).trim().optional(),
  })
)

export const deleteProjectValidator = vine.compile(
  vine.object({
    id: vine.number(),
  })
)

createProjectValidator.messagesProvider = new SimpleMessagesProvider({
  'name.required': 'A név megadása kötelező',
  'name.string': 'A névnek szövegnek kell lennie',
  'name.minLength': 'A névnek tartalmaznia kell minimum {{ min }} karaktert',
  'owner_id.required': 'A projekt tulajdonosának megadása kötelező',
  'owner_id.number': 'A projekt tulajdonosa azonosítójának számnak kell lennie',
})

modifyProjectValidator.messagesProvider = new SimpleMessagesProvider({
  'id.required': 'Az azonosító megadása kötelező',
  'id.number': 'Az azonosítónak számnak kell lennie',
  'name.string': 'A névnek szövegnek kell lennie',
  'name.minLength': 'A névnek tartalmaznia kell minimum {{ min }} karaktert',
})

deleteProjectValidator.messagesProvider = new SimpleMessagesProvider({
  'id.required': 'Az azonosító megadása kötelező',
  'id.number': 'Az azonosítónak számnak kell lennie',
})