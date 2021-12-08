import { Result } from '../infra/typeorm/entities/Result'

interface IBadgeResponseDTO {
  id: string
  image: string
  label: string
  result: Result
  image_url(): string
  created_at: Date
  updated_at: Date
}

export { IBadgeResponseDTO }
