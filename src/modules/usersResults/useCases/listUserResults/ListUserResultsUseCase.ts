import { inject, injectable } from 'tsyringe'
import { validate as validateUUID } from 'uuid'

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { UserResult } from '@modules/usersResults/infra/typeorm/entities/UserResult'
import { IUsersResultsRepository } from '@modules/usersResults/repositories/IUsersResultsRepository'
import { AppError } from '@shared/errors/AppError'

interface IRequest {
  user_id: string
}

@injectable()
class ListUserResultsUseCase {
  constructor(
    @inject('UsersResultsRepository')
    private usersResultsRepository: IUsersResultsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ user_id }: IRequest): Promise<UserResult[]> {
    const isUserValidUUID = validateUUID(user_id)

    if (!isUserValidUUID) {
      throw new AppError('Invalid user UUID')
    }

    const userExists = await this.usersRepository.findById(user_id)

    if (!userExists) {
      throw new AppError('User does not exist')
    }

    const userResults = await this.usersResultsRepository.findByUserResult(
      user_id
    )

    return userResults
  }
}

export { ListUserResultsUseCase }
