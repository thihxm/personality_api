import { Expose } from 'class-transformer'
import {
  Column,
  CreateDateColumn,
  Entity,
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

  @Column()
  profileImage_flor: string

  @Column()
  profileImage_diab: string

  @Column()
  profileImage_cora: string

  @Column()
  profileImage_estr: string

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

  @Expose({ name: 'profileImage_estr_url' })
  profileImagesURL(): { [Key: string]: string } {
    return {
      florzinha: `${process.env.APP_API_URL}/badge/${this.profileImage_flor}`,
      diabinho: `${process.env.APP_API_URL}/badge/${this.profileImage_diab}`,
      estrelinha: `${process.env.APP_API_URL}/badge/${this.profileImage_estr}`,
      coracaozinho: `${process.env.APP_API_URL}/badge/${this.profileImage_cora}`,
    }
  }

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}

export { Badge }
