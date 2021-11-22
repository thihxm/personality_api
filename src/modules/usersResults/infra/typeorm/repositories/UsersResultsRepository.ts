import { getRepository, Repository } from 'typeorm'

import { ICreateUserResultDTO } from '@modules/usersResults/dtos/ICreateUserResultDTO'
import { IListUserResultsDTO } from '@modules/usersResults/dtos/IListUserResultsDTO'
import { IUsersResultsRepository } from '@modules/usersResults/repositories/IUsersResultsRepository'

import { UserResult } from '../entities/UserResult'

class UsersResultsRepository implements IUsersResultsRepository {
  private repository: Repository<UserResult>

  constructor() {
    this.repository = getRepository(UserResult)
  }

  async create({
    id,
    user_id,
    result_id,
    isPrivate,
    isSelected,
  }: ICreateUserResultDTO): Promise<UserResult> {
    const userResult = this.repository.create({
      id,
      user_id,
      result_id,
      isPrivate,
      isSelected,
    })

    await this.repository.save(userResult)

    return userResult
  }

  async findByUserResult(
    user_id?: string,
    result_id?: string
  ): Promise<IListUserResultsDTO> {
    const [userResults, count] = await this.repository.findAndCount({
      where: { user_id, result_id },
    })

    return {
      userResults,
      count,
    }
  }
}

export { UsersResultsRepository }
