import { ICreateUserResultDTO } from '../dtos/ICreateUserResultDTO'
import { UserResult } from '../infra/typeorm/entities/UserResult'

interface IUsersResultsRepository {
  findByUserResult(user_id?: string, result_id?: string): Promise<UserResult[]>
  findByQuiz(user_id: string, quiz_id: string): Promise<UserResult>
  findById(id: string): Promise<UserResult>
  create({
    id,
    user_id,
    result_id,
    isSelected,
    isPrivate,
  }: ICreateUserResultDTO): Promise<UserResult>
}

export { IUsersResultsRepository }
