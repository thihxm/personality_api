import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListBadgesUseCase } from './ListBadgesUseCase'

class ListBadgesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { result_id } = req.params

    const listBadgesUseCase = container.resolve(ListBadgesUseCase)

    const badgesAndCount = await listBadgesUseCase.execute({ result_id })

    return res.json(badgesAndCount)
  }
}

export { ListBadgesController }
