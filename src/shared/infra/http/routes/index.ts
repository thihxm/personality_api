import { Router } from 'express'

import { authenticateRoutes } from './authenticate.routes'
import { questionsRoutes } from './questions.routes'
import { quizzesRoutes } from './quizzes.routes'
import { usersRoutes } from './users.routes'

const router = Router()

router.use('/users', usersRoutes)
router.use('/quizzes', quizzesRoutes)
router.use('/questions', questionsRoutes)
router.use(authenticateRoutes)

export { router }
