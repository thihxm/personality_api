import { getRepository, Repository } from 'typeorm'

import { ICreateBadgeDTO } from '@modules/quizzes/dtos/ICreateBadgeDTO'
import { IListBadgesDTO } from '@modules/quizzes/dtos/IListBadgesDTO'
import { IBadgesRepository } from '@modules/quizzes/repositories/IBadgesRepository'

import { Badge } from '../entities/Badge'

class BadgesRepository implements IBadgesRepository {
  private repository: Repository<Badge>

  constructor() {
    this.repository = getRepository(Badge)
  }

  async create({ id, image, label }: ICreateBadgeDTO): Promise<Badge> {
    const badge = this.repository.create({
      id,
      image,
      label,
    })

    await this.repository.save(badge)

    return badge
  }

  async findById(id: string): Promise<Badge> {
    const badge = await this.repository.findOne({ id })
    return badge
  }

  async findByResult(result_id: string): Promise<IListBadgesDTO> {
    const [badges, count] = await this.repository.findAndCount({
      where: {
        result: { id: result_id },
      },
    })

    return {
      badges,
      count,
    }
  }
}

export { BadgesRepository }
