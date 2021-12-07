import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { apple_id, email, name } = req.body

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase)
    console.log(`apple_id: ${apple_id}`)
    console.log(`email: ${email}`)
    console.log(`name: ${name}`)

    const authResponse = await authenticateUserUseCase.execute({
      apple_id,
      name,
      email,
    })

    return res.json(authResponse)
  }
}

export { AuthenticateUserController }
