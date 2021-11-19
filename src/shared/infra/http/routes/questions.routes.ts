import { Router } from 'express'

import { CreateQuestionController } from '@modules/quizzes/useCases/createQuestion/CreateQuestionController'

const questionsRoutes = Router()

const createQuestionController = new CreateQuestionController()

questionsRoutes.post('/', createQuestionController.handle)

export { questionsRoutes }
