import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateBadgeUseCase } from './CreateBadgeUseCase'

class CreateBadgeController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { label } = req.body
    const badge_image = req.files.badge_image[0].filename
    const profileImage_flor = req.files.profileImage_flor[0].filename
    const profileImage_diab = req.files.profileImage_diab[0].filename
    const profileImage_cora = req.files.profileImage_cora[0].filename
    const profileImage_estr = req.files.profileImage_estr[0].filename

    const createBadgeUseCase = container.resolve(CreateBadgeUseCase)

    const answer = await createBadgeUseCase.execute({
      label,
      badge_image,
      profileImage_flor,
      profileImage_diab,
      profileImage_cora,
      profileImage_estr,
    })

    return res.status(201).json(answer)
  }
}

export { CreateBadgeController }
