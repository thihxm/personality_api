import { ICreateQuizDTO } from '@modules/quizzes/dtos/ICreateQuizDTO'
import { Quiz } from '@modules/quizzes/infra/typeorm/entities/Quiz'

interface IListQuizzesDTO {
  quizzes: Quiz[]
  count: number
}

interface IQuizzesRepository {
  findByTitle(title: string): Promise<Quiz>
  findById(id: string): Promise<Quiz>
  listDescending(take?: number, skip?: number): Promise<IListQuizzesDTO>
  create({
    title,
    subtitle,
    about,
    color,
    estimatedTimeInMinutes,
  }: ICreateQuizDTO): Promise<Quiz>
}

export { IQuizzesRepository, IListQuizzesDTO }
