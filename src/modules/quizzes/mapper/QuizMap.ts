import { instanceToInstance } from 'class-transformer'

import { IQuizResponseDTO } from '../dtos/IQuizResponseDTO'
import { Quiz } from '../infra/typeorm/entities/Quiz'

class QuizMap {
  static toDTO({
    id,
    title,
    subtitle,
    about,
    color,
    image,
    estimatedTimeInMinutes,
    questions,
    results,
    image_url,
  }: Quiz): IQuizResponseDTO {
    const quiz = instanceToInstance({
      id,
      title,
      subtitle,
      about,
      color,
      image,
      estimatedTimeInMinutes,
      image_url,
      questions,
      results,
    })
    return quiz
  }
}

export { QuizMap }
