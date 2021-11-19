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

import { Question } from './Question'

@Entity('answers')
class Answer {
  @PrimaryColumn()
  id: string

  @Column()
  label: string

  @Column()
  score: string

  @ManyToOne(() => Question)
  @JoinColumn({ name: 'question_id' })
  question: Question

  @Column()
  question_id: string

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

export { Answer }
