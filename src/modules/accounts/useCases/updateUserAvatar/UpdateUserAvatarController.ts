import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase'

class UpdateUserAvatarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { baseAvatar, name } = req.body
    const { id } = req.user
    // const avatar_file = req.file.filename

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase)

    await updateUserAvatarUseCase.execute({ user_id: id, baseAvatar, name })

    return res.status(204).send()
  }
}

export { UpdateUserAvatarController }
