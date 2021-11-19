import { User } from '@modules/accounts/infra/typeorm/entities/User'

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { IUsersRepository } from '../IUsersRepository'

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = []

  async create({
    apple_id,
    email,
    name,
    baseAvatar,
  }: ICreateUserDTO): Promise<void> {
    const user = new User()

    Object.assign(user, {
      apple_id,
      email,
      name,
      baseAvatar,
    })

    this.users.push(user)
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email)
  }

  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id)
  }

  async findByAppleId(apple_id: string): Promise<User> {
    return this.users.find((user) => user.apple_id === apple_id)
  }
}

export { UsersRepositoryInMemory }
