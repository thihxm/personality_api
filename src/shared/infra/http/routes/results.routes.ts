import { Router } from 'express'

import { CreateResultController } from '@modules/quizzes/useCases/createResult/CreateResultController'

const resultsRoutes = Router()

const createResultController = new CreateResultController()

resultsRoutes.post('/', createResultController.handle)

export { resultsRoutes }
