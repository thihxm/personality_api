import { inject, injectable } from 'tsyringe'

import { IListQuizzesDTO } from '@modules/quizzes/dtos/IListQuizzesDTO'
import { IQuizzesRepository } from '@modules/quizzes/repositories/IQuizzesRepository'

interface IRequest {
  take?: number
  skip?: number
}

@injectable()
class ListQuizzesAndQuestionsUseCase {
  constructor(
    @inject('QuizzesRepository')
    private quizzesRepository: IQuizzesRepository
  ) {}

  async execute({ take, skip }: IRequest): Promise<IListQuizzesDTO> {
    const quizzes = await this.quizzesRepository.listDescendingWithQuestions(
      take,
      skip
    )

    return quizzes
  }
}

export { ListQuizzesAndQuestionsUseCase }
