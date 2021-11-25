import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { Question } from './Question'

@Entity('quizzes')
class Quiz {
  @PrimaryColumn()
  id: string

  @Column()
  title: string

  @Column()
  subtitle: string

  @Column()
  about: string

  @Column()
  color: string

  @Column()
  image: string

  @Column()
  estimatedTimeInMinutes: number

  @OneToMany(() => Question, (question) => question.quiz)
  questions: Question[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}

export { Quiz }
