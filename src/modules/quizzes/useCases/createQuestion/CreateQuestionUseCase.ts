import { inject, injectable } from 'tsyringe'

import { IQuestionsRepository } from '@modules/quizzes/repositories/IQuestionsRepository'

interface IRequest {
  label: string
  quiz_id: string
}

@injectable()
class CreateQuestionUseCase {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository
  ) {}

  async execute({ label, quiz_id }: IRequest) {}
}
