import { UserResult } from '../infra/typeorm/entities/UserResult'

interface IListUserResultsDTO {
  userResults: UserResult[]
  count: number
}

export { IListUserResultsDTO }
