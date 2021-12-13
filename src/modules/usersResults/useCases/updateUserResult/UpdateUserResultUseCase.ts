import { inject, injectable } from 'tsyringe'
import { validate as validateUUID } from 'uuid'

import { UserResult } from '@modules/usersResults/infra/typeorm/entities/UserResult'
import { IUsersResultsRepository } from '@modules/usersResults/repositories/IUsersResultsRepository'
import { AppError } from '@shared/errors/AppError'

interface IRequest {
  id: string
  isSelected: boolean
  isPrivate: boolean
}

@injectable()
class UpdateUserResultUseCase {
  constructor(
    @inject('UsersResultsRepository')
    private usersResultsRepository: IUsersResultsRepository
  ) {}

  async execute({ id, isSelected, isPrivate }: IRequest): Promise<UserResult> {
    const isValidUUID = validateUUID(id)

    if (!isValidUUID) {
      throw new AppError('Invalid UUID')
    }

    const userResult = await this.usersResultsRepository.findById(id)

    if (!userResult) {
      throw new AppError('UserResult does not exist')
    }

    userResult.isPrivate = isPrivate
    userResult.isSelected = isSelected

    await this.usersResultsRepository.create(userResult)

    return userResult
  }
}

export { UpdateUserResultUseCase }
