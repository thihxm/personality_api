import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateQuizUseCase } from './CreateQuizUseCase'

class CreateQuizController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { title, subtitle, about, color, estimatedTimeInMinutes } = req.body

    const image = req.file.filename

    const createQuizUseCase = container.resolve(CreateQuizUseCase)

    const quiz = await createQuizUseCase.execute({
      title,
      subtitle,
      about,
      color,
      image,
      estimatedTimeInMinutes,
    })

    return res.status(201).json(quiz)
  }
}

export { CreateQuizController }
