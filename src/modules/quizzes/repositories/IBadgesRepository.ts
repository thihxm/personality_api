import { ICreateBadgeDTO } from '../dtos/ICreateBadgeDTO'
import { IListBadgesDTO } from '../dtos/IListBadgesDTO'
import { Badge } from '../infra/typeorm/entities/Badge'

interface IBadgesRepository {
  findById(id: string): Promise<Badge>
  findByResult(result_id: string): Promise<IListBadgesDTO>
  create({ id, image, label }: ICreateBadgeDTO): Promise<Badge>
}

export { IBadgesRepository }
