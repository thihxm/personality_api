import { getRepository, Repository } from 'typeorm'

import { ICreateQuizDTO } from '@modules/quizzes/dtos/ICreateQuizDTO'
import {
  IListQuizzesDTO,
  IQuizzesRepository,
} from '@modules/quizzes/repositories/IQuizzesRepository'

import { Quiz } from '../entities/Quiz'

class QuizzesRepository implements IQuizzesRepository {
  private repository: Repository<Quiz>

  constructor() {
    this.repository = getRepository(Quiz)
  }

  async create({
    title,
    subtitle,
    about,
    color,
    estimatedTimeInMinutes,
  }: ICreateQuizDTO): Promise<Quiz> {
    const quiz = this.repository.create({
      title,
      subtitle,
      about,
      color,
      estimatedTimeInMinutes,
    })

    await this.repository.save(quiz)

    return quiz
  }

  async findByTitle(title: string): Promise<Quiz> {
    const quiz = await this.repository.findOne({ title })
    return quiz
  }

  async listDescending(take?: number, skip?: number): Promise<IListQuizzesDTO> {
    const takeAmount = take || 10
    const skipAmount = skip || 0

    const [quizzes, count] = await this.repository.findAndCount({
      order: { title: 'DESC' },
      take: takeAmount,
      skip: skipAmount,
    })

    return { quizzes, count }
  }
}

export { QuizzesRepository }
