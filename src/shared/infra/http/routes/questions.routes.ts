import { Router } from 'express'

import { CreateQuestionController } from '@modules/quizzes/useCases/createQuestion/CreateQuestionController'
import { ListQuestionsController } from '@modules/quizzes/useCases/listQuestions/ListQuestionsController'
import { ListQuestionsAndAnswersController } from '@modules/quizzes/useCases/listQuestionsAndAnswers/ListQuestionsAndAnswersController'

const questionsRoutes = Router()

const createQuestionController = new CreateQuestionController()
const listQuestionsController = new ListQuestionsController()
const listQuestionsAndAnswersController =
  new ListQuestionsAndAnswersController()

questionsRoutes.post('/', createQuestionController.handle)
questionsRoutes.get('/:quiz_id', listQuestionsController.handle)
questionsRoutes.get(
  '/includeAnswers/:quiz_id',
  listQuestionsAndAnswersController.handle
)

export { questionsRoutes }
