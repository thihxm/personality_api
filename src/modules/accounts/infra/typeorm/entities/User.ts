import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

@Entity('users')
class User {
  @PrimaryColumn()
  id: string

  @Column()
  apple_id: string

  @Column()
  email: string

  @Column()
  name: string

  @Column()
  baseAvatar: string

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

export { User }
