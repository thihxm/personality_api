import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListQuestionsAndAnswersUseCase } from './ListQuestionsAndAnswersUseCase'

class ListQuestionsAndAnswersController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { quiz_id } = req.params

    const listQuestionsAndAnswersUseCase = container.resolve(
      ListQuestionsAndAnswersUseCase
    )

    const questionsAndCount = await listQuestionsAndAnswersUseCase.execute({
      quiz_id,
    })

    return res.json(questionsAndCount)
  }
}

export { ListQuestionsAndAnswersController }
