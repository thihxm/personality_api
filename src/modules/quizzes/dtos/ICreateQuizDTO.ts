interface ICreateQuizDTO {
  id: string
  title: string
  subtitle: string
  about: string
  color: string
  image?: string
  estimatedTimeInMinutes: number
}

export { ICreateQuizDTO }
