import { inject, injectable } from 'tsyringe'
import { validate as validateUUID } from 'uuid'

import { IListAnswersDTO } from '@modules/quizzes/dtos/IListAnswersDTO'
import { IAnswersRepository } from '@modules/quizzes/repositories/IAnswersRepository'
import { IQuestionsRepository } from '@modules/quizzes/repositories/IQuestionsRepository'
import { AppError } from '@shared/errors/AppError'

interface IRequest {
  question_id: string
}

@injectable()
class ListAnswersUseCase {
  constructor(
    @inject('AnswersRepository')
    private answersRepository: IAnswersRepository,
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository
  ) {}

  async execute({ question_id }: IRequest): Promise<IListAnswersDTO> {
    const isValidUUID = validateUUID(question_id)

    if (!isValidUUID) {
      throw new AppError('Invalid Question UUID')
    }

    const questionExists = await this.questionsRepository.findById(question_id)

    if (!questionExists) {
      throw new AppError('Question does not exist')
    }

    const answersAndCount = await this.answersRepository.findByQuestion(
      question_id
    )

    return answersAndCount
  }
}

export { ListAnswersUseCase }
