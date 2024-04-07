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

// users
router.post('info/user', [UsersController, 'getUserInfo'])
router.post('sign-up', [UsersController, 'signUp'])
router.post('login', [UsersController, 'login'])
router.post('logout', [UsersController, 'logout'])
router.post('verify', [UsersController, 'verify'])
router.post('renew-token', [UsersController, 'renewToken'])
router.put('account', [UsersController, 'modifyAccount'])
router.delete('account', [UsersController, 'deleteAccount'])

// projects
router.post('info/project', [ProjectsController, 'getProjectInfo'])
router.post('user/projects', [ProjectsController, 'getUserProjects'])
router.post('project', [ProjectsController, 'createProject'])
router.put('project', [ProjectsController, 'modifyProject'])
router.delete('project', [ProjectsController, 'deleteProject'])
router.post('project/members', [ProjectsController, 'getMembers'])
router.post('project/member', [ProjectsController, 'addMember'])
router.delete('project/member', [ProjectsController, 'removeMember'])

// files
router.post('info/file', [FilesController, 'getFileInfo'])
router.post('project/files', [FilesController, 'getProjectFiles'])
router.post('file', [FilesController, 'createFile'])
router.put('file', [FilesController, 'modifyFile'])
router.delete('file', [FilesController, 'deleteFile'])
router.post('file/content', [FilesController, 'getFileContent'])
router.put('file/edit', [FilesController, 'editFileContent'])
router.post('info/file/edit', [FilesController, 'getLastEditInfo'])
