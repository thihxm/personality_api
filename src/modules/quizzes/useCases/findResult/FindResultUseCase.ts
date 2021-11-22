import { inject, injectable } from 'tsyringe'

import { Result } from '@modules/quizzes/infra/typeorm/entities/Result'
import { IResultsRepository } from '@modules/quizzes/repositories/IResultsRepository'

interface IRequest {
  code: string
}

@injectable()
class FindResultUseCase {
  constructor(
    @inject('ResultsRepository')
    private resultsRepository: IResultsRepository
  ) {}

  async execute({ code }: IRequest): Promise<Result> {
    const result = await this.resultsRepository.findByCode(code)

    return result
  }
}

export { FindResultUseCase }
