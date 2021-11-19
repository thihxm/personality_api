import { container } from 'tsyringe'

import '@shared/container/providers'

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { QuestionsRepository } from '@modules/quizzes/infra/typeorm/repositories/QuestionsRepository'
import { QuizzesRepository } from '@modules/quizzes/infra/typeorm/repositories/QuizzesRepository'
import { IQuestionsRepository } from '@modules/quizzes/repositories/IQuestionsRepository'
import { IQuizzesRepository } from '@modules/quizzes/repositories/IQuizzesRepository'

container.registerSingleton<IQuizzesRepository>(
  'QuizzesRepository',
  QuizzesRepository
)

container.registerSingleton<IQuestionsRepository>(
  'QuestionsRepository',
  QuestionsRepository
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)
