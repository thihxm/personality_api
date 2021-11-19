import { ICreateQuestionDTO } from '../dtos/ICreateQuestionDTO'
import { Question } from '../infra/typeorm/entities/Question'

interface IQuestionsRepository {
  findById(id: string): Promise<Question>
  findByQuiz(quiz_id: string): Promise<Question[]>
  create({ label, quiz_id }: ICreateQuestionDTO): Promise<Question>
}

export { IQuestionsRepository }
