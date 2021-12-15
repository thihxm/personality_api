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

  async findByUserResult(user_id: string): Promise<UserResult[]> {
    const userResults = await this.repository.find({
      relations: ['result', 'result.badge'],
      where: { user_id },
    })

    return userResults
  }

  async findById(id: string): Promise<UserResult> {
    const userResult = await this.repository.findOne({ id })

    return userResult
  }

  async findByQuiz(user_id: string, quiz_id: string): Promise<UserResult> {
    const userResult = await this.repository.findOne({
      relations: ['result'],
      where: {
        user_id,
        result: {
          quiz_id,
        },
      },
    })

    return userResult
  }
}

export { UsersResultsRepository }
