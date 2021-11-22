import { getRepository, Repository } from 'typeorm'

import { ICreateQuestionDTO } from '@modules/quizzes/dtos/ICreateQuestionDTO'
import { IListQuestionsDTO } from '@modules/quizzes/dtos/IListQuestionsDTO'
import { IQuestionsRepository } from '@modules/quizzes/repositories/IQuestionsRepository'

import { Question } from '../entities/Question'

class QuestionsRepository implements IQuestionsRepository {
  private repository: Repository<Question>

  constructor() {
    this.repository = getRepository(Question)
  }

  async create({ label, quiz_id }: ICreateQuestionDTO): Promise<Question> {
    const question = this.repository.create({
      label,
      quiz_id,
    })

    await this.repository.save(question)

    return question
  }

  async findById(id: string): Promise<Question> {
    const question = await this.repository.findOne({ id })
    return question
  }

  async findByQuiz(quiz_id: string): Promise<IListQuestionsDTO> {
    const [questions, count] = await this.repository.findAndCount({ quiz_id })
    return { questions, count }
  }

  async findByQuizWithAnswers(quiz_id: string): Promise<IListQuestionsDTO> {
    const [questions, count] = await this.repository.findAndCount({
      where: { quiz_id },
      relations: ['answers'],
    })
    return { questions, count }
  }
}

export { QuestionsRepository }
