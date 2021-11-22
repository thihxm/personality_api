import { inject, injectable } from 'tsyringe'
import { validate as validateUUID } from 'uuid'

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { IResultsRepository } from '@modules/quizzes/repositories/IResultsRepository'
import { UserResult } from '@modules/usersResults/infra/typeorm/entities/UserResult'
import { IUsersResultsRepository } from '@modules/usersResults/repositories/IUsersResultsRepository'
import { AppError } from '@shared/errors/AppError'

interface IRequest {
  user_id: string
  result_id: string
  isSelected: boolean
  isPrivate: boolean
}

@injectable()
class CreateUserResultUseCase {
  constructor(
    @inject('UsersResultsRepository')
    private usersResultsRepository: IUsersResultsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('ResultsRepository')
    private resultsRepository: IResultsRepository
  ) {}

  async execute({
    user_id,
    result_id,
    isSelected,
    isPrivate,
  }: IRequest): Promise<UserResult> {
    const isValidUserUUID = validateUUID(user_id)

    if (!isValidUserUUID) {
      throw new AppError('Invalid User UUID')
    }

    const isValidResultUUID = validateUUID(result_id)

    if (!isValidResultUUID) {
      throw new AppError('Invalid Result UUID')
    }

    const userExists = await this.usersRepository.findById(user_id)

    if (!userExists) {
      throw new AppError('User does not exist')
    }

    const resultExists = await this.resultsRepository.findById(result_id)

    if (!resultExists) {
      throw new AppError('Result does not exist')
    }

    const userResult = await this.usersResultsRepository.create({
      user_id,
      result_id,
      isSelected,
      isPrivate,
    })

    return userResult
  }
}

export { CreateUserResultUseCase }
