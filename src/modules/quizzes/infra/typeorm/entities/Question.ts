import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { Quiz } from './Quiz'

@Entity('questions')
class Question {
  @PrimaryColumn()
  id: string

  @Column()
  label: string

  @ManyToOne(() => Quiz)
  @JoinColumn({ name: 'quiz_id' })
  quiz: Quiz

  @Column()
  quiz_id: string

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

export { Question }
