import { Router } from 'express'

import { CreateQuizController } from '@modules/quizzes/useCases/createQuiz/CreateQuizController'

const quizzesRoutes = Router()

const createQuizController = new CreateQuizController()

quizzesRoutes.post('/', createQuizController.handle)

export { quizzesRoutes }
