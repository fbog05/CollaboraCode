/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const UsersController = () => import('#controllers/users_controller')
const ProjectsController = () => import('#controllers/projects_controller')
const FilesController = () => import('#controllers/files_controller')

router.get('/', () => {
  return []
})

router.get('users', [UsersController, 'getUsers'])
router.post('sign-up', [UsersController, 'signUp'])
router.post('login', [UsersController, 'login'])
router.post('logout', [UsersController, 'logout'])
router.put('account', [UsersController, 'modifyAccount'])
router.delete('account', [UsersController, 'deleteAccount'])
router.post('verify', [UsersController, 'verify'])
router.post('renew-token', [UsersController, 'renewToken'])
router.get('projects', [ProjectsController, 'getProjects'])
router.post('project', [ProjectsController, 'createProject'])
router.put('project', [ProjectsController, 'modifyProject'])
router.delete('project', [ProjectsController, 'deleteProject'])
router.get('files', [FilesController, 'getFiles'])
router.post('file', [FilesController, 'createFile'])
router.put('file', [FilesController, 'modifyFile'])
router.delete('file', [FilesController, 'deleteFile'])
