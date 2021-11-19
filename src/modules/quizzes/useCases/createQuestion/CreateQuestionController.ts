import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateQuestionUseCase } from './CreateQuestionUseCase'

class CreateQuestionController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { label, quiz_id } = req.body

    const createQuestionUseCase = container.resolve(CreateQuestionUseCase)

    const question = await createQuestionUseCase.execute({
      label,
      quiz_id,
    })

    return res.status(201).json(question)
  }
}

export { CreateQuestionController }
