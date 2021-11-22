import { inject, injectable } from 'tsyringe'
import { validate as validateUUID } from 'uuid'

import { IListQuestionsDTO } from '@modules/quizzes/dtos/IListQuestionsDTO'
import { IQuestionsRepository } from '@modules/quizzes/repositories/IQuestionsRepository'
import { IQuizzesRepository } from '@modules/quizzes/repositories/IQuizzesRepository'
import { AppError } from '@shared/errors/AppError'

interface IRequest {
  quiz_id: string
}

@injectable()
class ListQuestionsAndAnswersUseCase {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,
    @inject('QuizzesRepository')
    private quizzesRepository: IQuizzesRepository
  ) {}

  async execute({ quiz_id }: IRequest): Promise<IListQuestionsDTO> {
    const isValidUUID = validateUUID(quiz_id)

    if (!isValidUUID) {
      throw new AppError('Invalid Quiz UUID')
    }

    const quizExists = await this.quizzesRepository.findById(quiz_id)

    if (!quizExists) {
      throw new AppError('Quiz does not exist')
    }

    const questionsAndCount =
      await this.questionsRepository.findByQuizWithAnswers(quiz_id)

    return questionsAndCount
  }
}

export { ListQuestionsAndAnswersUseCase }
