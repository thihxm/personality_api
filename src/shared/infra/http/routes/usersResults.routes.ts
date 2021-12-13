import { Router } from 'express'

import { CreateUserResultController } from '@modules/usersResults/useCases/createUserResult/CreateUserResultController'
import { ListUserResultsController } from '@modules/usersResults/useCases/listUserResults/ListUserResultsController'
import { UpdateUserResultController } from '@modules/usersResults/useCases/updateUserResult/UpdateUserResultController'

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const usersResultsRoutes = Router()

const createUserResultController = new CreateUserResultController()
const listUserResultsController = new ListUserResultsController()
const updateUserResultController = new UpdateUserResultController()

usersResultsRoutes.post(
  '/',
  ensureAuthenticated,
  createUserResultController.handle
)

usersResultsRoutes.get(
  '/',
  ensureAuthenticated,
  listUserResultsController.handle
)

usersResultsRoutes.patch(
  '/',
  ensureAuthenticated,
  updateUserResultController.handle
)

export { usersResultsRoutes }
