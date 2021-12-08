import { inject, injectable } from 'tsyringe'

import { Result } from '@modules/quizzes/infra/typeorm/entities/Result'
import { BadgeMap } from '@modules/quizzes/mapper/BadgeMap'
import { IResultsRepository } from '@modules/quizzes/repositories/IResultsRepository'

interface IRequest {
  quiz_id: string
}

@injectable()
class ListQuizResultsUseCase {
  constructor(
    @inject('ResultsRepository')
    private resultsRepository: IResultsRepository
  ) {}

  async execute({ quiz_id }: IRequest): Promise<Result[]> {
    const results = await this.resultsRepository.findByQuiz(quiz_id)

    const mappedResults = results.map((result) => {
      const badge = BadgeMap.toDTO(result.badge)
      Object.assign(result, {
        badge,
      })
      return result
    })

    return mappedResults
  }
}

export { ListQuizResultsUseCase }
