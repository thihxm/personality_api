import { Router } from 'express'

import { authenticateRoutes } from './authenticate.routes'
import { quizzesRoutes } from './quizzzes.routes'
import { usersRoutes } from './users.routes'

const router = Router()

router.use('/users', usersRoutes)
router.use('/quizzes', quizzesRoutes)
router.use(authenticateRoutes)

export { router }
