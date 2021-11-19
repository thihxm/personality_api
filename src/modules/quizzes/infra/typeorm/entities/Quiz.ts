import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

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
  estimatedTimeInMinutes: number

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
