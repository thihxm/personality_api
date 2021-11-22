import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListAnswersUseCase } from './ListAnswersUseCase'

class ListAnswersController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { question_id } = req.params

    const listAnswersUseCase = container.resolve(ListAnswersUseCase)

    const questionsAndCount = await listAnswersUseCase.execute({ question_id })

    return res.json(questionsAndCount)
  }
}

export { ListAnswersController }
