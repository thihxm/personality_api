import { inject, injectable } from 'tsyringe'
import { validate as validateUUID } from 'uuid'

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { IResultsRepository } from '@modules/quizzes/repositories/IResultsRepository'
import { UserResult } from '@modules/usersResults/infra/typeorm/entities/UserResult'
import { IUsersResultsRepository } from '@modules/usersResults/repositories/IUsersResultsRepository'
import { AppError } from '@shared/errors/AppError'

interface IRequest {
  user_id?: string
  result_id?: string
}

@injectable()
class ListUserResultsUseCase {
  constructor(
    @inject('UsersResultsRepository')
    private usersResultsRepository: IUsersResultsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('ResultsRepository')
    private resultsRepository: IResultsRepository
  ) {}

  async execute({ user_id, result_id }: IRequest): Promise<UserResult[]> {
    if (user_id) {
      const isUserValidUUID = validateUUID(user_id)

      if (!isUserValidUUID) {
        throw new AppError('Invalid user UUID')
      }

      const userExists = await this.usersRepository.findById(user_id)

      if (!userExists) {
        throw new AppError('User does not exist')
      }
    }

    if (result_id) {
      const isResultValidUUID = validateUUID(result_id)

      if (!isResultValidUUID) {
        throw new AppError('Invalid result UUID')
      }

      const resultExists = await this.resultsRepository.findById(result_id)

      if (!resultExists) {
        throw new AppError('Result does not exist')
      }
    }

    const userResults = await this.usersResultsRepository.findByUserResult(
      user_id,
      result_id
    )

    return userResults
  }
}

export { ListUserResultsUseCase }
