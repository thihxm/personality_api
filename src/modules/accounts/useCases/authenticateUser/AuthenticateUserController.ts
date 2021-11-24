import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { code, email, name } = req.body

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase)

    const authResponse = await authenticateUserUseCase.execute({
      code,
      name,
      email,
    })

    return res.json(authResponse)
  }
}

export { AuthenticateUserController }
