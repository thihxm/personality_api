import { getRepository, Repository } from 'typeorm'

import { ICreateAnswerDTO } from '@modules/quizzes/dtos/ICreateAnswerDTO'
import { IListAnswersDTO } from '@modules/quizzes/dtos/IListAnswersDTO'
import { IAnswersRepository } from '@modules/quizzes/repositories/IAnswersRepository'

import { Answer } from '../entities/Answer'

class AnswersRepository implements IAnswersRepository {
  private repository: Repository<Answer>

  constructor() {
    this.repository = getRepository(Answer)
  }

  async create({
    id,
    label,
    score,
    question_id,
  }: ICreateAnswerDTO): Promise<Answer> {
    const answer = this.repository.create({
      id,
      label,
      score,
      question_id,
    })

    await this.repository.save(answer)

    return answer
  }

  async findById(id: string): Promise<Answer> {
    const answer = await this.repository.findOne({ id })
    return answer
  }

  async findByQuestion(question_id: string): Promise<IListAnswersDTO> {
    const [answers, count] = await this.repository.findAndCount({ question_id })
    return {
      answers,
      count,
    }
  }
}

export { AnswersRepository }
