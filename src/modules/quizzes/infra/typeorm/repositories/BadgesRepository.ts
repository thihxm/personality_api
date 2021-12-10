import { getRepository, Repository } from 'typeorm'

import { ICreateBadgeDTO } from '@modules/quizzes/dtos/ICreateBadgeDTO'
import { IBadgesRepository } from '@modules/quizzes/repositories/IBadgesRepository'

import { Badge } from '../entities/Badge'

class BadgesRepository implements IBadgesRepository {
  private repository: Repository<Badge>

  constructor() {
    this.repository = getRepository(Badge)
  }

  async create({
    id,
    image,
    label,
    profileImage_cora,
    profileImage_diab,
    profileImage_estr,
    profileImage_flor,
  }: ICreateBadgeDTO): Promise<Badge> {
    const badge = this.repository.create({
      id,
      image,
      profileImage_cora,
      profileImage_diab,
      profileImage_estr,
      profileImage_flor,
      label,
    })

    await this.repository.save(badge)

    return badge
  }

  async findById(id: string): Promise<Badge> {
    const badge = await this.repository.findOne({ id })
    return badge
  }

  async findByResult(result_id: string): Promise<Badge> {
    const badge = await this.repository.findOne({
      relations: ['result'],
      where: {
        result: { id: result_id },
      },
    })

    return badge
  }
}

export { BadgesRepository }
