import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { UpdateUserResultUseCase } from './UpdateUserResultUseCase'

class UpdateUserResultController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id, isSelected, isPrivate } = req.body

    const updateUserResultUseCase = container.resolve(UpdateUserResultUseCase)

    const userResult = await updateUserResultUseCase.execute({
      id,
      isSelected,
      isPrivate,
    })

    return res.status(201).json(userResult)
  }
}

export { UpdateUserResultController }
