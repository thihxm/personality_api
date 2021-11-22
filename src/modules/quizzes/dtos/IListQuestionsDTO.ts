import { Question } from '../infra/typeorm/entities/Question'

interface IListQuestionsDTO {
  questions: Question[]
  count: number
}

export { IListQuestionsDTO }
