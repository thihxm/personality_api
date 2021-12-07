import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '@config/upload'
import { CreateQuizController } from '@modules/quizzes/useCases/createQuiz/CreateQuizController'
import { ListQuizzesController } from '@modules/quizzes/useCases/listQuizzes/ListQuizzesController'
import { ListQuizzesAndQuestionsController } from '@modules/quizzes/useCases/listQuizzesAndQuestions/ListQuizzesAndQuestionsController'
import { UpdateQuizImageController } from '@modules/quizzes/useCases/updateQuizImage/UpdateQuizImageController'

const quizzesRoutes = Router()

const uploadImage = multer(uploadConfig.upload('./tmp/quiz'))

const createQuizController = new CreateQuizController()
const listQuizzesController = new ListQuizzesController()
const listQuizzesAndQuestionsController =
  new ListQuizzesAndQuestionsController()
const updateQuizImageController = new UpdateQuizImageController()

quizzesRoutes.post(
  '/',
  uploadImage.single('image'),
  createQuizController.handle
)
quizzesRoutes.get('/', listQuizzesController.handle)
quizzesRoutes.get('/includeQuestions', listQuizzesAndQuestionsController.handle)
quizzesRoutes.patch(
  '/image',
  uploadImage.single('image'),
  updateQuizImageController.handle
)

export { quizzesRoutes }
