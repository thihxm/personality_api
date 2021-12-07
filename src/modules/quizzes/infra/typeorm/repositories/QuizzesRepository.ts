import { getRepository, Repository } from 'typeorm'

import { ICreateQuizDTO } from '@modules/quizzes/dtos/ICreateQuizDTO'
import { IListQuizzesDTO } from '@modules/quizzes/dtos/IListQuizzesDTO'
import { IQuizzesRepository } from '@modules/quizzes/repositories/IQuizzesRepository'

import { Quiz } from '../entities/Quiz'

class QuizzesRepository implements IQuizzesRepository {
  private repository: Repository<Quiz>

  constructor() {
    this.repository = getRepository(Quiz)
  }

  async create({
    id,
    title,
    subtitle,
    about,
    color,
    image,
    estimatedTimeInMinutes,
  }: ICreateQuizDTO): Promise<Quiz> {
    const quiz = this.repository.create({
      id,
      title,
      subtitle,
      about,
      color,
      image,
      estimatedTimeInMinutes,
    })

    await this.repository.save(quiz)

    return quiz
  }

  async findByTitle(title: string): Promise<Quiz> {
    const quiz = await this.repository.findOne({ title })
    return quiz
  }

  async findById(id: string): Promise<Quiz> {
    const quiz = await this.repository.findOne({ id })
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

  async listDescendingWithQuestions(
    take?: number,
    skip?: number
  ): Promise<IListQuizzesDTO> {
    const takeAmount = take || 10
    const skipAmount = skip || 0

    const [quizzes, count] = await this.repository.findAndCount({
      order: { title: 'DESC' },
      take: takeAmount,
      skip: skipAmount,
      relations: ['questions', 'results'],
    })

    return { quizzes, count }
  }
}

export { QuizzesRepository }
