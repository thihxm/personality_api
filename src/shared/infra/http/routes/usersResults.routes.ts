import { Router } from 'express'

import { CreateUserResultController } from '@modules/usersResults/useCases/createUserResult/CreateUserResultController'

const usersResultsRoutes = Router()

const createUserResultController = new CreateUserResultController()

usersResultsRoutes.post('/', createUserResultController.handle)

export { usersResultsRoutes }
