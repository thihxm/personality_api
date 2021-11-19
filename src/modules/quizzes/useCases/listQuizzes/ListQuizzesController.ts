import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListQuizzesUseCase } from './ListQuizzesUseCase'

class ListQuizzesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { take, skip } = req.query

    const listQuizzesUseCase = container.resolve(ListQuizzesUseCase)

    const parsedTake = parseInt(take as string, 10)
    const newTake = Number.isNaN(parsedTake) ? 0 : parsedTake

    const parsedSkip = parseInt(skip as string, 10)
    const newSkip = Number.isNaN(parsedSkip) ? 0 : parsedSkip

    const quizzes = await listQuizzesUseCase.execute({
      take: newTake,
      skip: newSkip,
    })

    return res.json(quizzes)
  }
}

export { ListQuizzesController }
