import { inject, injectable } from 'tsyringe'

import { Quiz } from '@modules/quizzes/infra/typeorm/entities/Quiz'
import { IQuizzesRepository } from '@modules/quizzes/repositories/IQuizzesRepository'
import { AppError } from '@shared/errors/AppError'

interface IRequest {
  title: string
  subtitle: string
  about: string
  color: string
  estimatedTimeInMinutes: number
}

@injectable()
class CreateQuizUseCase {
  constructor(
    @inject('QuizzesRepository')
    private quizzesRepository: IQuizzesRepository
  ) {}

  async execute({
    title,
    subtitle,
    about,
    color,
    estimatedTimeInMinutes,
  }: IRequest): Promise<Quiz> {
    const colorRegEx = /^([0-9A-F]{3}){1,2}$/i

    const quizAlreadyExists = await this.quizzesRepository.findByTitle(title)

    if (quizAlreadyExists) {
      throw new AppError('Quiz already exists')
    }

    const isValidColor = colorRegEx.test(color)

    if (!isValidColor) {
      throw new AppError('Invalid color format')
    }

    if (estimatedTimeInMinutes < 1) {
      throw new AppError('Estimated time must be at least 1')
    }

    const quiz = await this.quizzesRepository.create({
      title,
      subtitle,
      about,
      color,
      estimatedTimeInMinutes,
    })

    return quiz
  }
}

export { CreateQuizUseCase }
