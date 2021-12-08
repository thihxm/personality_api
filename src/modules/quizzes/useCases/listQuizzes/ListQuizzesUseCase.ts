import { inject, injectable } from 'tsyringe'

import { IListQuizzesResponseDTO } from '@modules/quizzes/dtos/IListQuizzesResponseDTO'
import { QuizMap } from '@modules/quizzes/mapper/QuizMap'
import { IQuizzesRepository } from '@modules/quizzes/repositories/IQuizzesRepository'

interface IRequest {
  take?: number
  skip?: number
}

@injectable()
class ListQuizzesUseCase {
  constructor(
    @inject('QuizzesRepository')
    private quizzesRepository: IQuizzesRepository
  ) {}

  async execute({ take, skip }: IRequest): Promise<IListQuizzesResponseDTO> {
    const { quizzes, count } = await this.quizzesRepository.listDescending(
      take,
      skip
    )
    const mappedQuizzes = quizzes.map((quiz) => {
      return QuizMap.toDTO(quiz)
    })

    return {
      quizzes: mappedQuizzes,
      count,
    }
  }
}

export { ListQuizzesUseCase }
