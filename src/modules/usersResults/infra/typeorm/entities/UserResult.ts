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

import { User } from '@modules/accounts/infra/typeorm/entities/User'
import { Result } from '@modules/quizzes/infra/typeorm/entities/Result'

@Entity('results')
class UserResult {
  @PrimaryColumn()
  id: string

  @Column()
  isSelected: boolean

  @Column()
  isPrivate: boolean

  @Column()
  label: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column()
  user_id: string

  @ManyToOne(() => Result)
  @JoinColumn({ name: 'result_id' })
  result: Result

  @Column()
  result_id: string

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

export { UserResult }
