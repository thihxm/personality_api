import { instanceToInstance } from 'class-transformer'

import { IBadgeResponseDTO } from '../dtos/IBadgeResponseDTO'
import { Badge } from '../infra/typeorm/entities/Badge'

class BadgeMap {
  static toDTO({
    id,
    label,
    image,
    profileImage_flor,
    profileImage_diab,
    profileImage_cora,
    profileImage_estr,
    result,
    image_url,
    profileImagesURL,
    created_at,
    updated_at,
  }: Badge): IBadgeResponseDTO {
    const badge = instanceToInstance({
      id,
      label,
      image,
      profileImage_flor,
      profileImage_diab,
      profileImage_cora,
      profileImage_estr,
      result,
      image_url,
      profileImagesURL,
      created_at,
      updated_at,
    })
    return badge
  }
}

export { BadgeMap }
