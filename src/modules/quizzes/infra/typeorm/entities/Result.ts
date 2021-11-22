import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { Badge } from './Badge'
import { Quiz } from './Quiz'

@Entity('results')
class Result {
  @PrimaryColumn()
  id: string

  @Column()
  code: string

  @Column()
  about: string

  @Column()
  label: string

  @OneToOne(() => Badge)
  @JoinColumn({ name: 'badge_id' })
  badge: Badge

  @Column()
  badge_id: string

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

export { Result }
