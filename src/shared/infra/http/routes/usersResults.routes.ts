import { Router } from 'express'

import { CreateUserResultController } from '@modules/usersResults/useCases/createUserResult/CreateUserResultController'
import { ListUserResultsController } from '@modules/usersResults/useCases/listUserResults/ListUserResultsController'

const usersResultsRoutes = Router()

const createUserResultController = new CreateUserResultController()
const listUserResultsController = new ListUserResultsController()

usersResultsRoutes.post('/', createUserResultController.handle)
usersResultsRoutes.get('/', listUserResultsController.handle)

export { usersResultsRoutes }
