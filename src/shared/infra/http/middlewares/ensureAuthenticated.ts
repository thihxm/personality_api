import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository'
import { AppError } from '@shared/errors/AppError'

interface IPayload {
  sub: string
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new AppError('Token missing', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub: user_id } = verify(
      token,
      `${process.env.AUTH_SECRET}`
    ) as IPayload

    const usersRepository = new UsersRepository()

    const user = await usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User does not exist', 401)
    }

    req.user = {
      id: user_id,
    }

    next()
  } catch {
    throw new AppError('Invalid token', 401)
  }
}
