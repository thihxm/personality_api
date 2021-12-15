import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { UserResult } from '@modules/usersResults/infra/typeorm/entities/UserResult'
import { IUsersResultsRepository } from '@modules/usersResults/repositories/IUsersResultsRepository'
import { AppError } from '@shared/errors/AppError'

interface IRequest {
  apple_id: string
  name: string
  email: string
}

interface IReponse {
  user: {
    id: string
    name: string
    email: string
    apple_id: string
    baseAvatar: string
    userResults: UserResult[]
  }
  token: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersResultsRepository')
    private usersResultsRepository: IUsersResultsRepository
  ) {}

  async execute({ apple_id, name, email }: IRequest): Promise<IReponse> {
    if (!apple_id) {
      throw new AppError('Unable to authenticate user without apple_id')
    }

    let user = await this.usersRepository.findByAppleId(apple_id)

    if (!user) {
      // Should register new user
      user = await this.usersRepository.create({
        email,
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
        expiresIn: '120d',
      }
    )

    // const userResults = await this.usersResultsRepository.findByUserResult(
    //   user.id
    // )

    const tokenReturn: IReponse = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        apple_id: user.apple_id,
        baseAvatar: user.baseAvatar ?? 'diabinho',
        userResults: [],
      },
      token,
    }

    return tokenReturn
  }
}
export { AuthenticateUserUseCase }
