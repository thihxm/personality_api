import { ICreateQuizDTO } from '@modules/quizzes/dtos/ICreateQuizDTO'
import { IListQuizzesDTO } from '@modules/quizzes/dtos/IListQuizzesDTO'
import { Quiz } from '@modules/quizzes/infra/typeorm/entities/Quiz'

import { IQuizzesRepository } from '../IQuizzesRepository'

class QuizzesRepositoryInMemory implements IQuizzesRepository {
  quizzes: Quiz[] = []

  async create({
    title,
    subtitle,
    about,
    color,
    image,
    estimatedTimeInMinutes,
  }: ICreateQuizDTO): Promise<Quiz> {
    const quiz = new Quiz()

    Object.assign(quiz, {
      title,
      subtitle,
      about,
      color,
      image,
      estimatedTimeInMinutes,
    })

    this.quizzes.push(quiz)

    return quiz
  }

  async findByTitle(title: string): Promise<Quiz> {
    return this.quizzes.find((quiz) => quiz.title === title)
  }

  async findById(id: string): Promise<Quiz> {
    return this.quizzes.find((quiz) => quiz.id === id)
  }

  async listDescending(take?: number, skip?: number): Promise<IListQuizzesDTO> {
    const quizzes = this.quizzes.sort((a, b) => {
      const aCreateDate = new Date(a.created_at)
      const bCreateDate = new Date(b.created_at)
      if (aCreateDate > bCreateDate) {
        return -1
      }
      if (aCreateDate < bCreateDate) {
        return 1
      }
      return 0
    })
    const count = quizzes.length

    return {
      quizzes,
      count,
    }
  }

  async listDescendingWithQuestions(
    take?: number,
    skip?: number
  ): Promise<IListQuizzesDTO> {
    return this.listDescending(take, skip)
  }
}

export { QuizzesRepositoryInMemory }
