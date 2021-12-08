import { Router } from 'express'

import { CreateResultController } from '@modules/quizzes/useCases/createResult/CreateResultController'
import { FindResultController } from '@modules/quizzes/useCases/findResult/FindResultController'
import { ListQuizResultsController } from '@modules/quizzes/useCases/listQuizResults/ListQuizResultsController'

const resultsRoutes = Router()

const createResultController = new CreateResultController()
const findResultController = new FindResultController()
const listQuizResultsController = new ListQuizResultsController()

resultsRoutes.post('/', createResultController.handle)
resultsRoutes.get('/:code', findResultController.handle)
resultsRoutes.get('/quiz/:quiz_id', listQuizResultsController.handle)

export { resultsRoutes }
