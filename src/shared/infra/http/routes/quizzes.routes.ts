import { Router } from 'express'

import { CreateQuizController } from '@modules/quizzes/useCases/createQuiz/CreateQuizController'
import { ListQuizzesController } from '@modules/quizzes/useCases/listQuizzes/ListQuizzesController'

const quizzesRoutes = Router()

const createQuizController = new CreateQuizController()
const listQuizzesController = new ListQuizzesController()

quizzesRoutes.post('/', createQuizController.handle)
quizzesRoutes.get('/', listQuizzesController.handle)

export { quizzesRoutes }
