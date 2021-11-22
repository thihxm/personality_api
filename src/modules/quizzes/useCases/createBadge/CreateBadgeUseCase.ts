import { inject, injectable } from 'tsyringe'

import { Badge } from '@modules/quizzes/infra/typeorm/entities/Badge'
import { IBadgesRepository } from '@modules/quizzes/repositories/IBadgesRepository'

interface IRequest {
  id?: string
  image: string
  label: string
}

@injectable()
class CreateBadgeUseCase {
  constructor(
    @inject('BadgesRepository')
    private badgesRepository: IBadgesRepository
  ) {}

  async execute({ id, image, label }: IRequest): Promise<Badge> {
    const badge = await this.badgesRepository.create({
      id,
      image,
      label,
    })

    return badge
  }
}

export { CreateBadgeUseCase }
