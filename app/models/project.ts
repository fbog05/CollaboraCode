import { DateTime } from 'luxon'
import {
  afterCreate,
  BaseModel,
  beforeDelete,
  column,
  hasMany,
  manyToMany,
} from '@adonisjs/lucid/orm'
import User from './user.js'
import File from './file.js'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import ProjectMember from './project_member.js'

export default class Project extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare ownerId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(() => File)
  declare file: HasMany<typeof File>

  @manyToMany(() => User, {
    pivotTable: 'project_members',
  })
  declare members: ManyToMany<typeof User>

  @afterCreate()
  static async createMemberTable(project: Project) {
    await ProjectMember.create({
      userId: project.ownerId,
      projectId: project.id,
    })
  }

  @beforeDelete()
  static async deleteMemberTable(project: Project) {
    await File.query().where('project_id', project.id).delete()
    await ProjectMember.query().where('project_id', project.id).delete()
  }
}