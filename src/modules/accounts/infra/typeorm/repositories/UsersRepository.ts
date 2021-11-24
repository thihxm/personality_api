import { getRepository, Repository } from 'typeorm'

import { ICreateUserDTO } from '../../../dtos/ICreateUserDTO'
import { IUsersRepository } from '../../../repositories/IUsersRepository'
import { User } from '../entities/User'

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  async create({
    id,
    apple_id,
    email,
    name,
    baseAvatar,
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      id,
      apple_id,
      email,
      name,
      baseAvatar,
    })

    await this.repository.save(user)

    return user
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email })
    return user
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id)
    return user
  }

  async findByAppleId(apple_id: string): Promise<User> {
    const user = await this.repository.findOne({ apple_id })
    return user
  }
}

export { UsersRepository }
