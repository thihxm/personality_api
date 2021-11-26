import { inject, injectable } from 'tsyringe'

import { Result } from '@modules/quizzes/infra/typeorm/entities/Result'
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
    const result = await this.resultsRepository.findByQuiz(quiz_id)

    return result
  }
}

export { ListQuizResultsUseCase }
