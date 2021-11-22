import { Router } from 'express'

import { CreateAnswerController } from '@modules/quizzes/useCases/createAnswer/CreateAnswerController'
import { ListAnswersController } from '@modules/quizzes/useCases/listAnswers/ListAnswersController'

const answersRoutes = Router()

const createAnswerController = new CreateAnswerController()
const listAnswersController = new ListAnswersController()

answersRoutes.post('/', createAnswerController.handle)
answersRoutes.get('/:question_id', listAnswersController.handle)

export { answersRoutes }
