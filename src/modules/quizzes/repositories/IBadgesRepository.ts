import { ICreateBadgeDTO } from '../dtos/ICreateBadgeDTO'
import { Badge } from '../infra/typeorm/entities/Badge'

interface IBadgesRepository {
  findById(id: string): Promise<Badge>
  findByResult(result_id: string): Promise<Badge>
  create({
    id,
    image,
    profileImage_flor,
    profileImage_diab,
    profileImage_cora,
    profileImage_estr,
    label,
  }: ICreateBadgeDTO): Promise<Badge>
}

export { IBadgesRepository }
