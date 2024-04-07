import File from '#models/file'
import User from '#models/user'
import { createFileValidator, modifyFileValidator, deleteFileValidator } from '#validators/file'
import { Authenticator } from '@adonisjs/auth'
import { AccessToken } from '@adonisjs/auth/access_tokens'
import { Authenticators } from '@adonisjs/auth/types'
import { HttpContext } from '@adonisjs/core/http'

export default class FilesController {
  async getFiles({ response }: HttpContext) {
    const files = await File.all()
    response.status(200).json(files)
  }

  async createFile({ auth, request, response }: HttpContext) {
    const authResult = await this.authenticateUser(auth)
    if (!authResult.user) {
      return response
        .status(authResult.error.status)
        .send('Be kell jelentkezni a fájl létrehozásához!')
    }

    const data = request.all()

    try {
      await createFileValidator.validate(data)

      const file = await File.create(data)

      response.status(201).json(file)
    } catch (error) {
      response.status(422).send(error)
      console.log(error)
    }
  }

  async modifyFile({ auth, request, response }: HttpContext) {
    const authResult = await this.authenticateUser(auth)
    if (!authResult.user) {
      return response
        .status(authResult.error.status)
        .send('Be kell jelentkezni a fájl módosításához!')
    }

    const data = request.all()

    try {
      await modifyFileValidator.validate(data)

      const file = await File.findOrFail(data.id)

      await file.merge(data).save()

      response.status(201).json(file)
    } catch (error) {
      response.status(422).send(error)
      console.log(error)
    }
  }

  async deleteFile({ auth, request, response }: HttpContext) {
    const authResult = await this.authenticateUser(auth)
    if (!authResult.user) {
      return response.status(authResult.error.status).send('Be kell jelentkezni a fájl törléséhez!')
    }

    const data = request.all()
    try {
      await deleteFileValidator.validate(data)

      const file = await File.findOrFail(data.id)

      await file.delete()

      response.status(200).json(file)
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
