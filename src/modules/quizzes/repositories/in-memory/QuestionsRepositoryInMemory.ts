import { ICreateQuestionDTO } from '@modules/quizzes/dtos/ICreateQuestionDTO'
import { Question } from '@modules/quizzes/infra/typeorm/entities/Question'

import { IQuestionsRepository } from '../IQuestionsRepository'

class QuestionsRepositoryInMemory implements IQuestionsRepository {
  questions: Question[] = []

  async create({ label, quiz_id }: ICreateQuestionDTO): Promise<Question> {
    const question = new Question()

    Object.assign(question, {
      label,
      quiz_id,
    })

    this.questions.push(question)

    return question
  }

  async findById(id: string): Promise<Question> {
    return this.questions.find((question) => question.id === id)
  }

  async findByQuiz(quiz_id: string): Promise<Question[]> {
    return this.questions.filter((question) => question.quiz_id === quiz_id)
  }
}

export { QuestionsRepositoryInMemory }
