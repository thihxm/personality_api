import { IQuizResponseDTO } from './IQuizResponseDTO'

interface IListQuizzesResponseDTO {
  quizzes: IQuizResponseDTO[]
  count: number
}

export { IListQuizzesResponseDTO }
