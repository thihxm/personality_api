interface ICreateQuizDTO {
  title: string
  subtitle: string
  about: string
  color: string
  image?: string
  estimatedTimeInMinutes: number
}

export { ICreateQuizDTO }
