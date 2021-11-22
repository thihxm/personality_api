import { ICreateQuestionDTO } from '@modules/quizzes/dtos/ICreateQuestionDTO'
import { IListQuestionsDTO } from '@modules/quizzes/dtos/IListQuestionsDTO'
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

  async findByQuiz(quiz_id: string): Promise<IListQuestionsDTO> {
    const questions = this.questions.filter(
      (question) => question.quiz_id === quiz_id
    )
    return {
      questions,
      count: questions.length,
    }
  }
}

export { QuestionsRepositoryInMemory }
