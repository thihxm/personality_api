import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateAnswerUseCase } from './CreateAnswerUseCase'

class CreateAnswerController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { label, score, question_id } = req.body

    const createAnswerUseCase = container.resolve(CreateAnswerUseCase)

    const answer = await createAnswerUseCase.execute({
      label,
      score,
      question_id,
    })

    return res.status(201).json(answer)
  }
}

export { CreateAnswerController }
