import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { FindResultUseCase } from './FindResultUseCase'

class FindResultController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { code } = req.params

    const findResultUseCase = container.resolve(FindResultUseCase)

    const result = await findResultUseCase.execute({ code })

    return res.json(result)
  }
}

export { FindResultController }
