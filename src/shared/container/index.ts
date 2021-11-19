import { container } from 'tsyringe'

import '@shared/container/providers'

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { QuizzesRepository } from '@modules/quizzes/infra/typeorm/repositories/QuizzesRepository'
import { IQuizzesRepository } from '@modules/quizzes/repositories/IQuizzesRepository'

container.registerSingleton<IQuizzesRepository>(
  'QuizzesRepository',
  QuizzesRepository
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)
