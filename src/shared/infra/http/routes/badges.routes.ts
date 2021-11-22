import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '@config/upload'
import { CreateBadgeController } from '@modules/quizzes/useCases/createBadge/CreateBadgeController'
import { ListBadgesController } from '@modules/quizzes/useCases/listBadges/ListBadgesController'

const badgesRoutes = Router()

const uploadImage = multer(uploadConfig.upload('./tmp/badge'))

const createBadgeController = new CreateBadgeController()
const listBadgesController = new ListBadgesController()

badgesRoutes.post(
  '/',
  uploadImage.single('badge'),
  createBadgeController.handle
)

badgesRoutes.get('/:result_id', listBadgesController.handle)

export { badgesRoutes }
