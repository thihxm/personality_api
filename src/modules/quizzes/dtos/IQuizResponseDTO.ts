import { Question } from '../infra/typeorm/entities/Question'
import { Result } from '../infra/typeorm/entities/Result'

interface IQuizResponseDTO {
  id: string
  title: string
  subtitle: string
  about: string
  color: string
  image?: string
  estimatedTimeInMinutes: number
  image_url(): string
  questions?: Question[]
  results?: Result[]
}

export { IQuizResponseDTO }
