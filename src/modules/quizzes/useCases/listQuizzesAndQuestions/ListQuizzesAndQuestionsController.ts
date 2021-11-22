import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListQuizzesAndQuestionsUseCase } from './ListQuizzesAndQuestionsUseCase'

class ListQuizzesAndQuestionsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { take, skip } = req.query

    const listQuizzesAndQuestionsUseCase = container.resolve(
      ListQuizzesAndQuestionsUseCase
    )

    const parsedTake = parseInt(take as string, 10)
    const newTake = Number.isNaN(parsedTake) ? 0 : parsedTake

    const parsedSkip = parseInt(skip as string, 10)
    const newSkip = Number.isNaN(parsedSkip) ? 0 : parsedSkip

    const quizzes = await listQuizzesAndQuestionsUseCase.execute({
      take: newTake,
      skip: newSkip,
    })

    return res.json(quizzes)
  }
}

export { ListQuizzesAndQuestionsController }
