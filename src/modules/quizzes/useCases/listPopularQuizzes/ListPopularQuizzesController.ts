import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListPopularQuizzesUseCase } from './ListPopularQuizzesUseCase'

class ListPopularQuizzesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { take } = req.query

    const listPopularQuizzesUseCase = container.resolve(
      ListPopularQuizzesUseCase
    )

    const parsedTake = parseInt(take as string, 10)
    const newTake = Number.isNaN(parsedTake) ? 0 : parsedTake

    const quizzes = await listPopularQuizzesUseCase.execute({
      take: newTake,
    })

    return res.json(quizzes)
  }
}

export { ListPopularQuizzesController }
