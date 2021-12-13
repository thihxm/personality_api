import { ICreateUserResultDTO } from '@modules/usersResults/dtos/ICreateUserResultDTO'
import { UserResult } from '@modules/usersResults/infra/typeorm/entities/UserResult'

import { IUsersResultsRepository } from '../IUsersResultsRepository'

class UsersResultsRepositoryInMemory implements IUsersResultsRepository {
  usersResults: UserResult[] = []

  async create({
    id,
    user_id,
    result_id,
    isPrivate,
    isSelected,
  }: ICreateUserResultDTO): Promise<UserResult> {
    const userResult = new UserResult()

    Object.assign(userResult, {
      id,
      user_id,
      result_id,
      isPrivate,
      isSelected,
    })

    this.usersResults.push(userResult)

    return userResult
  }

  async findByUserResult(
    user_id: string,
    result_id: string
  ): Promise<UserResult[]> {
    const userResults = this.usersResults.filter(
      (usersResult) =>
        usersResult.user_id === user_id && usersResult.result_id === result_id
    )

    return userResults
  }

  async findById(id: string): Promise<UserResult> {
    const userResult = this.usersResults.find(
      (usersResult) => usersResult.id === id
    )

    return userResult
  }

  async findByQuiz(user_id: string, quiz_id: string): Promise<UserResult> {
    const userResult = this.usersResults.find(
      (usersResult) => usersResult.user_id === user_id
    )

    return userResult
  }
}

export { UsersResultsRepositoryInMemory }
