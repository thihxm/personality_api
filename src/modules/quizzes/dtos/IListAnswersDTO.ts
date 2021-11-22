import { Answer } from '../infra/typeorm/entities/Answer'

interface IListAnswersDTO {
  answers: Answer[]
  count: number
}

export { IListAnswersDTO }
