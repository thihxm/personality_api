import { inject, injectable } from 'tsyringe'
import { validate as validateUUID } from 'uuid'

import { Result } from '@modules/quizzes/infra/typeorm/entities/Result'
import { IBadgesRepository } from '@modules/quizzes/repositories/IBadgesRepository'
import { IQuizzesRepository } from '@modules/quizzes/repositories/IQuizzesRepository'
import { IResultsRepository } from '@modules/quizzes/repositories/IResultsRepository'
import { AppError } from '@shared/errors/AppError'

interface IRequest {
  code: string
  about: string
  label: string
  color: string
  badge_id: string
  quiz_id: string
}

@injectable()
class CreateResultUseCase {
  constructor(
    @inject('ResultsRepository')
    private resultsRepository: IResultsRepository,
    @inject('BadgesRepository')
    private badgesRepository: IBadgesRepository,
    @inject('QuizzesRepository')
    private quizzesRepository: IQuizzesRepository
  ) {}

  async execute({
    code,
    about,
    label,
    color,
    badge_id,
    quiz_id,
  }: IRequest): Promise<Result> {
    const isBadgeIdValidUUID = validateUUID(badge_id)

    if (!isBadgeIdValidUUID) {
      throw new AppError('Invalid Badge UUID')
    }

    const isQuizIdValidUUID = validateUUID(quiz_id)

    if (!isQuizIdValidUUID) {
      throw new AppError('Invalid Quiz UUID')
    }

    const badgeExists = await this.badgesRepository.findById(badge_id)

    if (!badgeExists) {
      throw new AppError('Badge does not exist')
    }

    const quizExists = await this.quizzesRepository.findById(quiz_id)

    if (!quizExists) {
      throw new AppError('Quiz does not exist')
    }

    const result = await this.resultsRepository.create({
      code,
      about,
      label,
      color,
      badge_id,
      quiz_id,
    })

    return result
  }
}

export { CreateResultUseCase }
