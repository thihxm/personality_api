import { ICreateQuizDTO } from '@modules/quizzes/dtos/ICreateQuizDTO'
import { Quiz } from '@modules/quizzes/infra/typeorm/entities/Quiz'

import { IListQuizzesDTO } from '../dtos/IListQuizzesDTO'

interface IQuizzesRepository {
  findByTitle(title: string): Promise<Quiz>
  findById(id: string): Promise<Quiz>
  listDescending(take?: number, skip?: number): Promise<IListQuizzesDTO>
  listDescendingWithQuestions(
    take?: number,
    skip?: number
  ): Promise<IListQuizzesDTO>
  create({
    id,
    title,
    subtitle,
    about,
    color,
    image,
    estimatedTimeInMinutes,
  }: ICreateQuizDTO): Promise<Quiz>
}

export { IQuizzesRepository }
