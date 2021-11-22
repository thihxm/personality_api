import { ICreateAnswerDTO } from '@modules/quizzes/dtos/ICreateAnswerDTO'
import { IListAnswersDTO } from '@modules/quizzes/dtos/IListAnswersDTO'
import { Answer } from '@modules/quizzes/infra/typeorm/entities/Answer'

import { IAnswersRepository } from '../IAnswersRepository'

class AnswersRepositoryInMemory implements IAnswersRepository {
  answers: Answer[] = []

  async create({
    id,
    label,
    score,
    question_id,
  }: ICreateAnswerDTO): Promise<Answer> {
    const answer = new Answer()

    Object.assign(answer, {
      id,
      label,
      score,
      question_id,
    })

    this.answers.push(answer)

    return answer
  }

  async findById(id: string): Promise<Answer> {
    return this.answers.find((answer) => answer.id === id)
  }

  async findByQuestion(question_id: string): Promise<IListAnswersDTO> {
    const answers = this.answers.filter(
      (answer) => answer.question_id === question_id
    )

    const count = answers.length

    return {
      answers,
      count,
    }
  }
}

export { AnswersRepositoryInMemory }
