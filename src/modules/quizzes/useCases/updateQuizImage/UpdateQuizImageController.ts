import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { UpdateQuizImageUseCase } from './UpdateQuizImageUseCase'

class UpdateQuizImageController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { quiz_id } = req.body
    const image_file = req.file.filename

    const updateQuizImageUseCase = container.resolve(UpdateQuizImageUseCase)

    await updateQuizImageUseCase.execute({ quiz_id, image_file })

    return res.status(204).send()
  }
}

export { UpdateQuizImageController }
