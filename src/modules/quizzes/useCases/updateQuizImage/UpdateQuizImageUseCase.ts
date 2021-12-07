import { inject, injectable } from 'tsyringe'

import { IQuizzesRepository } from '@modules/quizzes/repositories/IQuizzesRepository'
import { deleteFile } from '@utils/file'

interface IRequest {
  quiz_id: string
  image_file: string
}

@injectable()
class UpdateQuizImageUseCase {
  constructor(
    @inject('QuizzesRepository')
    private quizzesRepository: IQuizzesRepository
  ) {}

  async execute({ quiz_id, image_file }: IRequest): Promise<void> {
    const quiz = await this.quizzesRepository.findById(quiz_id)

    if (quiz.image) {
      await deleteFile(`./tmp/quiz/${quiz.image}`)
    }

    quiz.image = image_file

    await this.quizzesRepository.create(quiz)
  }
}

export { UpdateQuizImageUseCase }
