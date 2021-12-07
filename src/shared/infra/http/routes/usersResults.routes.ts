import { Router } from 'express'

import { CreateUserResultController } from '@modules/usersResults/useCases/createUserResult/CreateUserResultController'
import { ListUserResultsController } from '@modules/usersResults/useCases/listUserResults/ListUserResultsController'

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const usersResultsRoutes = Router()

const createUserResultController = new CreateUserResultController()
const listUserResultsController = new ListUserResultsController()

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

export { usersResultsRoutes }
