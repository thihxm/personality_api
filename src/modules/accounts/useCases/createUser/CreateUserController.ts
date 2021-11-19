import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateUserUseCase } from './CreateUserUseCase'

class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { apple_id, email, name } = req.body

    const createUserUseCase = container.resolve(CreateUserUseCase)

    await createUserUseCase.execute({
      apple_id,
      email,
      name,
    })

    return res.status(201).send()
  }
}

export { CreateUserController }
