import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '@config/upload'
import { CreateBadgeController } from '@modules/quizzes/useCases/createBadge/CreateBadgeController'

const badgesRoutes = Router()

const uploadImage = multer(uploadConfig.upload('./tmp/badge'))

const createBadgeController = new CreateBadgeController()

badgesRoutes.post(
  '/',
  uploadImage.single('badge'),
  createBadgeController.handle
)

export { badgesRoutes }
