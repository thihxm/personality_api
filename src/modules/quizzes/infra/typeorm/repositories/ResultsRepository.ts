import { getRepository, Repository } from 'typeorm'

import { ICreateResultDTO } from '@modules/quizzes/dtos/ICreateResultDTO'
import { IResultsRepository } from '@modules/quizzes/repositories/IResultsRepository'

import { Result } from '../entities/Result'

class ResultsRepository implements IResultsRepository {
  private repository: Repository<Result>

  constructor() {
    this.repository = getRepository(Result)
  }

  async create({
    id,
    code,
    about,
    label,
    badge_id,
    quiz_id,
  }: ICreateResultDTO): Promise<Result> {
    const result = this.repository.create({
      id,
      code,
      about,
      label,
      badge_id,
      quiz_id,
    })

    await this.repository.save(result)

    return result
  }

  async findById(id: string): Promise<Result> {
    const result = await this.repository.findOne({ id })
    return result
  }

  async findByQuiz(quiz_id: string): Promise<Result[]> {
    const results = await this.repository.find({ quiz_id })
    return results
  }

  async findByCode(code: string): Promise<Result> {
    const result = await this.repository.findOne({ code })
    return result
  }
}

export { ResultsRepository }
