import { inject, injectable } from 'tsyringe'

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'

interface IRequest {
  user_id: string
  baseAvatar: string
  name: string
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ user_id, baseAvatar, name }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id)

    // if (user.baseAvatar) {
    //   await deleteFile(`./tmp/avatar/${user.baseAvatar}`)
    // }

    user.baseAvatar = baseAvatar
    user.name = name

    await this.usersRepository.create(user)
  }
}

export { UpdateUserAvatarUseCase }
