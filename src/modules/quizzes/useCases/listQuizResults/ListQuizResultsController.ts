import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListQuizResultsUseCase } from './ListQuizResultsUseCase'

class ListQuizResultsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { quiz_id } = req.params

    const listQuizResultsUseCase = container.resolve(ListQuizResultsUseCase)

    const results = await listQuizResultsUseCase.execute({ quiz_id })

    return res.json(results)
  }
}

export { ListQuizResultsController }
