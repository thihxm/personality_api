import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateBadgeUseCase } from './CreateBadgeUseCase'

class CreateBadgeController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { label } = req.body
    const image = req.file.filename

    const createBadgeUseCase = container.resolve(CreateBadgeUseCase)

    const answer = await createBadgeUseCase.execute({
      label,
      image,
    })

    return res.status(201).json(answer)
  }
}

export { CreateBadgeController }
