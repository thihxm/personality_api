import { ICreateUserResultDTO } from '@modules/usersResults/dtos/ICreateUserResultDTO'
import { UserResult } from '@modules/usersResults/infra/typeorm/entities/UserResult'

import { IUsersResultsRepository } from '../IUsersResultsRepository'

class UsersResultsRepositoryInMemory implements IUsersResultsRepository {
  usersResults: UserResult[] = []

  async create({
    user_id,
    result_id,
    isPrivate,
    isSelected,
  }: ICreateUserResultDTO): Promise<UserResult> {
    const userResult = new UserResult()

    Object.assign(userResult, {
      user_id,
      result_id,
      isPrivate,
      isSelected,
    })

    this.usersResults.push(userResult)

    return userResult
  }

  async findByUser(user_id: string): Promise<UserResult[]> {
    return this.usersResults.filter(
      (usersResult) => usersResult.user_id === user_id
    )
  }
  async findByResult(result_id: string): Promise<UserResult[]> {
    return this.usersResults.filter(
      (usersResult) => usersResult.result_id === result_id
    )
  }
  async findByUserResult(
    user_id: string,
    result_id: string
  ): Promise<UserResult> {
    return this.usersResults.find(
      (usersResult) =>
        usersResult.user_id === user_id && usersResult.result_id === result_id
    )
  }
}

export { UsersResultsRepositoryInMemory }
