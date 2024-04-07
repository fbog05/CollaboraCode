import type { HttpContext } from '@adonisjs/core/http'

import Project from '#models/project'
import {
  createProjectValidator,
  deleteProjectValidator,
  modifyProjectValidator,
} from '#validators/project'
import User from '#models/user'
import { Authenticator } from '@adonisjs/auth'
import { AccessToken } from '@adonisjs/auth/access_tokens'
import { Authenticators } from '@adonisjs/auth/types'

export default class ProjectsController {
  async getProjects({ response }: HttpContext) {
    const projects = await Project.all()
    response.status(200).json(projects)
  }

  async createProject({ auth, request, response }: HttpContext) {
    const authResult = await this.authenticateUser(auth)
    if (!authResult.user) {
      return response
        .status(authResult.error.status)
        .send('Be kell jelentkezni a projekt létrehozásához!')
    }

    const name = request.input('name')
    const data = { name, owner_id: authResult.user.id }

    try {
      await createProjectValidator.validate(data)

      const project = await Project.create(data)

      response.status(201).json(project)
    } catch (error) {
      response.status(422).send(error)
      console.log(error)
    }
  }

  async modifyProject({ auth, request, response }: HttpContext) {
    const authResult = await this.authenticateUser(auth)
    if (!authResult.user) {
      return response
        .status(authResult.error.status)
        .send('Be kell jelentkezni a projekt módosításához!')
    }

    const data = request.all()

    try {
      await modifyProjectValidator.validate(data)

      const project = await Project.findOrFail(data.id)

      if (project.ownerId !== authResult.user.id) {
        return response.status(401).send('Nincsen jogosultsága a projekt módosításához!')
      }

      await project.merge(data).save()

      response.status(201).json(project)
    } catch (error) {
      response.status(422).send(error)
      console.log(error)
    }
  }

  async deleteProject({ auth, request, response }: HttpContext) {
    const authResult = await this.authenticateUser(auth)
    if (!authResult.user) {
      return response
        .status(authResult.error.status)
        .send('Be kell jelentkezni a projekt törléséhez!')
    }

    const data = request.all()
    try {
      await deleteProjectValidator.validate(data)

      const project = await Project.findOrFail(data.id)

      if (project.ownerId !== authResult.user.id) {
        return response.status(401).send('Nincsen jogosultsága a projekt törléséhez!')
      }

      await project.delete()

      response.status(200).json(project)
    } catch (error) {
      response.status(422).send(error)
    }
  }

  private async authenticateUser(auth: Authenticator<Authenticators>) {
    let authResult: {
      user:
        | (User & {
            currentAccessToken: AccessToken
          })
        | undefined
      error: { status: number; message: string }
    } = {
      user: undefined,
      error: { status: 401, message: 'Nem érvényes token' },
    }
    try {
      authResult.user = await auth.authenticate()
      if (!authResult.user) {
        return authResult
      }
    } catch (error) {
      if (error.code === 'E_UNAUTHORIZED_ACCESS') {
        return authResult
      } else {
        authResult.error = { status: error.status, message: error }
        return authResult
      }
    }
    return authResult
  }
}
