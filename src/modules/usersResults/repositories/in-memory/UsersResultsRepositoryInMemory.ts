import { ICreateUserResultDTO } from '@modules/usersResults/dtos/ICreateUserResultDTO'
import { IListUserResultsDTO } from '@modules/usersResults/dtos/IListUserResultsDTO'
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
  ): Promise<IListUserResultsDTO> {
    const userResults = this.usersResults.filter(
      (usersResult) =>
        usersResult.user_id === user_id && usersResult.result_id === result_id
    )

    const count = this.usersResults.length

    return {
      userResults,
      count,
    }
  }
}

export { UsersResultsRepositoryInMemory }
