import { ICreateQuestionDTO } from '../dtos/ICreateQuestionDTO'
import { IListQuestionsDTO } from '../dtos/IListQuestionsDTO'
import { Question } from '../infra/typeorm/entities/Question'

interface IQuestionsRepository {
  findById(id: string): Promise<Question>
  findByQuiz(quiz_id: string): Promise<IListQuestionsDTO>
  findByQuizWithAnswers(quiz_id: string): Promise<IListQuestionsDTO>
  create({ label, quiz_id }: ICreateQuestionDTO): Promise<Question>
}

export { IQuestionsRepository }
