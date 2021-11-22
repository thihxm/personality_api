import { ICreateResultDTO } from '@modules/quizzes/dtos/ICreateResultDTO'
import { Result } from '@modules/quizzes/infra/typeorm/entities/Result'

import { IResultsRepository } from '../IResultsRepository'

class ResultsRepositoryInMemory implements IResultsRepository {
  results: Result[] = []

  async create({
    id,
    code,
    about,
    label,
    badge_id,
    quiz_id,
  }: ICreateResultDTO): Promise<Result> {
    const result = new Result()

    Object.assign(result, {
      id,
      code,
      about,
      label,
      badge_id,
      quiz_id,
    })

    this.results.push(result)

    return result
  }

  async findById(id: string): Promise<Result> {
    return this.results.find((result) => result.id === id)
  }

  async findByQuiz(quiz_id: string): Promise<Result[]> {
    return this.results.filter((result) => result.quiz_id === quiz_id)
  }
}

export { ResultsRepositoryInMemory }
