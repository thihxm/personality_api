import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateUserResultUseCase } from './CreateUserResultUseCase'

class CreateUserResultController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { user_id, result_id, isSelected, isPrivate } = req.body

    const createUserResultUseCase = container.resolve(CreateUserResultUseCase)

    const answer = await createUserResultUseCase.execute({
      user_id,
      result_id,
      isSelected,
      isPrivate,
    })

    return res.status(201).json(answer)
  }
}

export { CreateUserResultController }
