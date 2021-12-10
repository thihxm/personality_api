import { ICreateBadgeDTO } from '@modules/quizzes/dtos/ICreateBadgeDTO'
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

  async findByResult(result_id: string): Promise<Badge> {
    const badge = this.badges.find((badge) => badge.result.id === result_id)

    return badge
  }
}

export { BadgesRepositoryInMemory }
