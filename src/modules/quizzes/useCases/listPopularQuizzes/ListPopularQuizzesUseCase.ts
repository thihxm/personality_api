import { inject, injectable } from 'tsyringe'

import { IListQuizzesResponseDTO } from '@modules/quizzes/dtos/IListQuizzesResponseDTO'
import { QuizMap } from '@modules/quizzes/mapper/QuizMap'
import { IQuizzesRepository } from '@modules/quizzes/repositories/IQuizzesRepository'

interface IRequest {
  take?: number
}

@injectable()
class ListPopularQuizzesUseCase {
  constructor(
    @inject('QuizzesRepository')
    private quizzesRepository: IQuizzesRepository
  ) {}

  async execute({ take }: IRequest): Promise<IListQuizzesResponseDTO> {
    const quizzes = await this.quizzesRepository.listPopularDescending(take)
    const mappedQuizzes = quizzes.map((quiz) => {
      return QuizMap.toDTO(quiz)
    })

    return {
      quizzes: mappedQuizzes,
      count: mappedQuizzes.length,
    }
  }
}

export { ListPopularQuizzesUseCase }
