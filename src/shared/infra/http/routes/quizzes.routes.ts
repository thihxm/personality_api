import { Router } from 'express'

import { CreateQuizController } from '@modules/quizzes/useCases/createQuiz/CreateQuizController'
import { ListQuizzesController } from '@modules/quizzes/useCases/listQuizzes/ListQuizzesController'
import { ListQuizzesAndQuestionsController } from '@modules/quizzes/useCases/listQuizzesAndQuestions/ListQuizzesAndQuestionsController'

const quizzesRoutes = Router()

const createQuizController = new CreateQuizController()
const listQuizzesController = new ListQuizzesController()
const listQuizzesAndQuestionsController =
  new ListQuizzesAndQuestionsController()

quizzesRoutes.post('/', createQuizController.handle)
quizzesRoutes.get('/', listQuizzesController.handle)
quizzesRoutes.get('/includeQuestions', listQuizzesAndQuestionsController.handle)

export { quizzesRoutes }
