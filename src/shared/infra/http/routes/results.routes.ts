import { Router } from 'express'

import { CreateResultController } from '@modules/quizzes/useCases/createResult/CreateResultController'
import { FindResultController } from '@modules/quizzes/useCases/findResult/FindResultController'

const resultsRoutes = Router()

const createResultController = new CreateResultController()
const findResultController = new FindResultController()

resultsRoutes.post('/', createResultController.handle)
resultsRoutes.get('/:code', findResultController.handle)

export { resultsRoutes }
