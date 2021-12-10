import { ICreateUserResultDTO } from '../dtos/ICreateUserResultDTO'
import { UserResult } from '../infra/typeorm/entities/UserResult'

interface IUsersResultsRepository {
  findByUserResult(user_id?: string, result_id?: string): Promise<UserResult[]>
  create({
    id,
    user_id,
    result_id,
    isSelected,
    isPrivate,
  }: ICreateUserResultDTO): Promise<UserResult>
}

export { IUsersResultsRepository }
