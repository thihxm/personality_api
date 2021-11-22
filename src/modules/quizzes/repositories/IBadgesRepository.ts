import { ICreateBadgeDTO } from '../dtos/ICreateBadgeDTO'
import { Badge } from '../infra/typeorm/entities/Badge'

interface IBadgesRepository {
  findById(id: string): Promise<Badge>
  create({ id, image, label }: ICreateBadgeDTO): Promise<Badge>
}

export { IBadgesRepository }
