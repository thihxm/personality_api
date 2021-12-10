import { Result } from '../infra/typeorm/entities/Result'

interface IBadgeResponseDTO {
  id: string
  image: string
  profileImage_flor: string
  profileImage_diab: string
  profileImage_cora: string
  profileImage_estr: string
  label: string
  result: Result
  image_url(): string
  profileImagesURL(): { [ego: string]: string }
  created_at: Date
  updated_at: Date
}

export { IBadgeResponseDTO }
