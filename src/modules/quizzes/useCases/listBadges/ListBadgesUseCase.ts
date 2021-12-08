import { inject, injectable } from 'tsyringe'
import { validate as validateUUID } from 'uuid'

import { IListBadgesResponseDTO } from '@modules/quizzes/dtos/IListBadgesResponseDTO'
import { BadgeMap } from '@modules/quizzes/mapper/BadgeMap'
import { IBadgesRepository } from '@modules/quizzes/repositories/IBadgesRepository'
import { IResultsRepository } from '@modules/quizzes/repositories/IResultsRepository'
import { AppError } from '@shared/errors/AppError'

interface IRequest {
  result_id: string
}

@injectable()
class ListBadgesUseCase {
  constructor(
    @inject('BadgesRepository')
    private badgesRepository: IBadgesRepository,
    @inject('ResultsRepository')
    private resultsRepository: IResultsRepository
  ) {}

  async execute({ result_id }: IRequest): Promise<IListBadgesResponseDTO> {
    const isValidUUID = validateUUID(result_id)

    if (!isValidUUID) {
      throw new AppError('Invalid Result UUID')
    }

    const resultExists = await this.resultsRepository.findById(result_id)

    if (!resultExists) {
      throw new AppError('Result does not exist')
    }

    const { badges, count } = await this.badgesRepository.findByResult(
      result_id
    )
    console.log(badges)

    const mappedBadges = badges.map((badge) => {
      return BadgeMap.toDTO(badge)
    })

    return {
      badges: mappedBadges,
      count,
    }
  }
}

export { ListBadgesUseCase }
