import { getRepository, Repository } from 'typeorm'

import { ICreateQuizDTO } from '@modules/quizzes/dtos/ICreateQuizDTO'
import { IListQuizzesDTO } from '@modules/quizzes/dtos/IListQuizzesDTO'
import { IQuizzesRepository } from '@modules/quizzes/repositories/IQuizzesRepository'
import { UserResult } from '@modules/usersResults/infra/typeorm/entities/UserResult'

import { Quiz } from '../entities/Quiz'

class QuizzesRepository implements IQuizzesRepository {
  private repository: Repository<Quiz>
  private usersResultsRepository: Repository<UserResult>

  constructor() {
    this.repository = getRepository(Quiz)
    this.usersResultsRepository = getRepository(UserResult)
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

  async listPopularDescending(take?: number): Promise<Quiz[]> {
    const takeAmount = take || 4

    const quizzes = await this.repository
      .createQueryBuilder('quiz')
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .from(UserResult, 'userResult')
          .leftJoin('userResult.result', 'result')
          .select('result.quiz_id', 'quiz_id')
          .groupBy('result.quiz_id')
          .orderBy('COUNT(result.quiz_id)', 'DESC')
          .limit(takeAmount)
          .getQuery()
        return `quiz.id IN ${subQuery}`
      })
      .getMany()

    return quizzes
  }
}

export { QuizzesRepository }
