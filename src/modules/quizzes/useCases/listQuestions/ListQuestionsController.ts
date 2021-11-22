import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListQuestionsUseCase } from './ListQuestionsUseCase'

class ListQuestionsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { quiz_id } = req.params

    const listQuestionsUseCase = container.resolve(ListQuestionsUseCase)

    const questionsAndCount = await listQuestionsUseCase.execute({ quiz_id })

    return res.json(questionsAndCount)
  }
}

export { ListQuestionsController }
