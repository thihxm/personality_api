import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateResultUseCase } from './CreateResultUseCase'

class CreateResultController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { code, about, label, badge_id, quiz_id } = req.body

    const createResultUseCase = container.resolve(CreateResultUseCase)

    const result = await createResultUseCase.execute({
      code,
      about,
      label,
      badge_id,
      quiz_id,
    })

    return res.status(201).json(result)
  }
}

export { CreateResultController }
