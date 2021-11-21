import { ICreateAnswerDTO } from '../dtos/ICreateAnswerDTO'
import { Answer } from '../infra/typeorm/entities/Answer'

interface IAnswersRepository {
  findById(id: string): Promise<Answer>
  findByQuestion(question_id: string): Promise<Answer[]>
  create({ id, label, score, question_id }: ICreateAnswerDTO): Promise<Answer>
}

export { IAnswersRepository }
