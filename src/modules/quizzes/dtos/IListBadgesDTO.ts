import { Badge } from '../infra/typeorm/entities/Badge'

interface IListBadgesDTO {
  badges: Badge[]
  count: number
}

export { IListBadgesDTO }
