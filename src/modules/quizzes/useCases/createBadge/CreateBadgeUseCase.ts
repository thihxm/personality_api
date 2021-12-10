import { inject, injectable } from 'tsyringe'

import { Badge } from '@modules/quizzes/infra/typeorm/entities/Badge'
import { IBadgesRepository } from '@modules/quizzes/repositories/IBadgesRepository'

interface IRequest {
  id?: string
  badge_image: string
  profileImage_flor: string
  profileImage_diab: string
  profileImage_cora: string
  profileImage_estr: string
  label: string
}

@injectable()
class CreateBadgeUseCase {
  constructor(
    @inject('BadgesRepository')
    private badgesRepository: IBadgesRepository
  ) {}

  async execute({
    id,
    badge_image,
    profileImage_flor,
    profileImage_diab,
    profileImage_cora,
    profileImage_estr,
    label,
  }: IRequest): Promise<Badge> {
    const badge = await this.badgesRepository.create({
      id,
      image: badge_image,
      profileImage_flor,
      profileImage_diab,
      profileImage_cora,
      profileImage_estr,
      label,
    })

    return badge
  }
}

export { CreateBadgeUseCase }
