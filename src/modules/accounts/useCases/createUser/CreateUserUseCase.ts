import { inject, injectable } from 'tsyringe'

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { AppError } from '@shared/errors/AppError'

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ apple_id, email, name }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new AppError('User already exists')
    }

    await this.usersRepository.create({
      apple_id,
      email,
      name,
    })
  }
}

export { CreateUserUseCase }
