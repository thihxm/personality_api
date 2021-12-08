import { Expose } from 'class-transformer'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { Result } from './Result'

@Entity('badges')
class Badge {
  @PrimaryColumn()
  id: string

  @Column()
  image: string

  @Column()
  label: string

  @OneToOne(() => Result, (result) => result.badge)
  result: Result

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @Expose({ name: 'image_url' })
  image_url(): string {
    return `${process.env.APP_API_URL}/badge/${this.image}`
  }

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}

export { Badge }
