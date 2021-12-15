import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListUserResultsUseCase } from './ListUserResultsUseCase'

class ListUserResultsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user

    const listUserResultsUseCase = container.resolve(ListUserResultsUseCase)

    const userResults = await listUserResultsUseCase.execute({
      user_id: id,
    })

    return res.json(userResults)
  }
}

export { ListUserResultsController }
