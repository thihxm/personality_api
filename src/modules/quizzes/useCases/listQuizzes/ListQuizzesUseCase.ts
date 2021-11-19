import { inject, injectable } from 'tsyringe'

import {
  IListQuizzesDTO,
  IQuizzesRepository,
} from '@modules/quizzes/repositories/IQuizzesRepository'

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

  async execute({ take, skip }: IRequest): Promise<IListQuizzesDTO> {
    const quizzes = await this.quizzesRepository.listDescending(take, skip)

    return quizzes
  }
}

export { ListQuizzesUseCase }
