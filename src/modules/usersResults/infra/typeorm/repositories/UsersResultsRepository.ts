import { getRepository, Repository } from 'typeorm'

import { ICreateUserResultDTO } from '@modules/usersResults/dtos/ICreateUserResultDTO'
import { IUsersResultsRepository } from '@modules/usersResults/repositories/IUsersResultsRepository'

import { UserResult } from '../entities/UserResult'

class UsersResultsRepository implements IUsersResultsRepository {
  private repository: Repository<UserResult>

  constructor() {
    this.repository = getRepository(UserResult)
  }

  async create({
    user_id,
    result_id,
    isPrivate,
    isSelected,
  }: ICreateUserResultDTO): Promise<UserResult> {
    const userResult = this.repository.create({
      user_id,
      result_id,
      isPrivate,
      isSelected,
    })

    await this.repository.save(userResult)

    return userResult
  }

  async findByUser(user_id: string): Promise<UserResult[]> {
    const usersResults = await this.repository.find({ user_id })
    return usersResults
  }

  async findByResult(result_id: string): Promise<UserResult[]> {
    const usersResults = await this.repository.find({ result_id })
    return usersResults
  }

  async findByUserResult(
    user_id: string,
    result_id: string
  ): Promise<UserResult> {
    const usersResults = await this.repository.findOne({ user_id, result_id })
    return usersResults
  }
}

export { UsersResultsRepository }
