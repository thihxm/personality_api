import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id_token, email, name } = req.body

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase)
    console.log(`id_token: ${id_token}`)
    console.log(`email: ${email}`)
    console.log(`name: ${name}`)

    const authResponse = await authenticateUserUseCase.execute({
      id_token,
      name,
      email,
    })

    return res.json(authResponse)
  }
}

export { AuthenticateUserController }
