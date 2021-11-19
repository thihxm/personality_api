import { inject, injectable } from 'tsyringe'

import { Question } from '@modules/quizzes/infra/typeorm/entities/Question'
import { IQuestionsRepository } from '@modules/quizzes/repositories/IQuestionsRepository'
import { IQuizzesRepository } from '@modules/quizzes/repositories/IQuizzesRepository'
import { AppError } from '@shared/errors/AppError'

interface IRequest {
  label: string
  quiz_id: string
}

@injectable()
class CreateQuestionUseCase {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,
    @inject('QuizzesRepository')
    private quizzesRepository: IQuizzesRepository
  ) {}

  async execute({ label, quiz_id }: IRequest): Promise<Question> {
    const quizExists = await this.quizzesRepository.findById(quiz_id)

    if (!quizExists) {
      throw new AppError('Quiz does not exit')
    }

    const question = await this.questionsRepository.create({ label, quiz_id })

    return question
  }
}

export { CreateQuestionUseCase }
