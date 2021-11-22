import { Router } from 'express'

import { CreateQuestionController } from '@modules/quizzes/useCases/createQuestion/CreateQuestionController'
import { ListQuestionsController } from '@modules/quizzes/useCases/listQuestions/ListQuestionsController'

const questionsRoutes = Router()

const createQuestionController = new CreateQuestionController()
const listQuestionsController = new ListQuestionsController()

questionsRoutes.post('/', createQuestionController.handle)
questionsRoutes.get('/:quiz_id', listQuestionsController.handle)

export { questionsRoutes }
