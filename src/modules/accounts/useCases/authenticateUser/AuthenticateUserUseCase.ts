import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import appleSignIn from '@config/appleSignIn'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { AppError } from '@shared/errors/AppError'

interface IRequest {
  code: string
  name: string
  email: string
}

interface IReponse {
  user: {
    id: string
    name: string
    email: string
    apple_id: string
  }
  token: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ code, name, email }: IRequest): Promise<IReponse> {
    const clientSecret = await appleSignIn.createClientSecret({})

    const { id_token: apple_id } = await appleSignIn.getAuthorizationToken(
      clientSecret,
      code,
      {}
    )
    const { email: appleEmail } = await appleSignIn.verifyIdToken(apple_id, {})

    if (!appleEmail) {
      throw new AppError('Unable to authenticate user without email')
    }

    let user = await this.usersRepository.findByAppleId(apple_id)

    if (!user) {
      // Should register new user
      user = await this.usersRepository.create({
        email: email || appleEmail,
        apple_id,
        name,
      })
    }

    // User exists
    if (email && email !== user.email) {
      user.email = email
      await this.usersRepository.create(user)
    }
    const secret = `${process.env.AUTH_SECRET}`
    const token = sign(
      {
        user,
      },
      secret,
      {
        subject: user.id,
        expiresIn: '30d',
      }
    )

    const tokenReturn: IReponse = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        apple_id: user.apple_id,
      },
      token,
    }

    return tokenReturn
  }
}
export { AuthenticateUserUseCase }
