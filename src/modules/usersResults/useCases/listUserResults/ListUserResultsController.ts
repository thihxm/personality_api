import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListUserResultsUseCase } from './ListUserResultsUseCase'

class ListUserResultsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { user_id, result_id } = req.query

    const listUserResultsUseCase = container.resolve(ListUserResultsUseCase)

    const questionsAndCount = await listUserResultsUseCase.execute({
      user_id: user_id as string,
      result_id: result_id as string,
    })

    return res.json(questionsAndCount)
  }
}

export { ListUserResultsController }
