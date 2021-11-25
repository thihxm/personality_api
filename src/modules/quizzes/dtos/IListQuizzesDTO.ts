import { Quiz } from '../infra/typeorm/entities/Quiz'

interface IListQuizzesDTO {
  quizzes: Quiz[]
  count: number
}

export { IListQuizzesDTO }
