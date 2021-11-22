import { ICreateBadgeDTO } from '@modules/quizzes/dtos/ICreateBadgeDTO'
import { IListBadgesDTO } from '@modules/quizzes/dtos/IListBadgesDTO'
import { Badge } from '@modules/quizzes/infra/typeorm/entities/Badge'

import { IBadgesRepository } from '../IBadgesRepository'

class BadgesRepositoryInMemory implements IBadgesRepository {
  badges: Badge[] = []

  async create({ id, image, label }: ICreateBadgeDTO): Promise<Badge> {
    const badge = new Badge()

    Object.assign(badge, {
      id,
      image,
      label,
    })

    this.badges.push(badge)

    return badge
  }

  async findById(id: string): Promise<Badge> {
    return this.badges.find((badge) => badge.id === id)
  }

  async findByResult(result_id: string): Promise<IListBadgesDTO> {
    const badges = this.badges.filter((badge) => badge.result.id === result_id)

    const count = badges.length

    return {
      badges,
      count,
    }
  }
}

export { BadgesRepositoryInMemory }
