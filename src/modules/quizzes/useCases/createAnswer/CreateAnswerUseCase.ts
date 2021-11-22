import { inject, injectable } from 'tsyringe'
import { validate as validateUUID } from 'uuid'

import { Answer } from '@modules/quizzes/infra/typeorm/entities/Answer'
import { IAnswersRepository } from '@modules/quizzes/repositories/IAnswersRepository'
import { IQuestionsRepository } from '@modules/quizzes/repositories/IQuestionsRepository'
import { AppError } from '@shared/errors/AppError'

interface IRequest {
  label: string
  score: string
  question_id: string
}

@injectable()
class CreateAnswerUseCase {
  constructor(
    @inject('AnswersRepository')
    private answersRepository: IAnswersRepository,
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository
  ) {}

  async execute({ label, score, question_id }: IRequest): Promise<Answer> {
    const isValidUUID = validateUUID(question_id)

    if (!isValidUUID) {
      throw new AppError('Invalid UUID')
    }

    const questionExists = await this.questionsRepository.findById(question_id)

    if (!questionExists) {
      throw new AppError('Question does not exist')
    }

    const question = await this.answersRepository.create({
      label,
      score,
      question_id,
    })

    return question
  }
}

export { CreateAnswerUseCase }
