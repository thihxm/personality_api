import { getRepository, Repository } from 'typeorm'

import { ICreateQuestionDTO } from '@modules/quizzes/dtos/ICreateQuestionDTO'
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
  async findByQuiz(quiz_id: string): Promise<Question[]> {
    const question = await this.repository.find({ quiz_id })
    return question
  }
}

export { QuestionsRepository }
