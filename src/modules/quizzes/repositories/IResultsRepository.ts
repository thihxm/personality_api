import { ICreateResultDTO } from '../dtos/ICreateResultDTO'
import { Result } from '../infra/typeorm/entities/Result'

interface IResultsRepository {
  findById(id: string): Promise<Result>
  findByQuiz(quiz_id: string): Promise<Result[]>
  create({
    id,
    code,
    about,
    label,
    badge_id,
    quiz_id,
  }: ICreateResultDTO): Promise<Result>
}

export { IResultsRepository }
