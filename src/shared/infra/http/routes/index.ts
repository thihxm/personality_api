import { Router } from 'express'

import { answersRoutes } from './answers.routes'
import { authenticateRoutes } from './authenticate.routes'
import { questionsRoutes } from './questions.routes'
import { quizzesRoutes } from './quizzes.routes'
import { usersRoutes } from './users.routes'

const router = Router()

router.use('/users', usersRoutes)
router.use('/quizzes', quizzesRoutes)
router.use('/questions', questionsRoutes)
router.use('/answers', answersRoutes)
router.use(authenticateRoutes)

export { router }
