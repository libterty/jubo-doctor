import { Entity, BaseEntity, PrimaryGeneratedColumn, VersionColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BeforeUpdate, Column, OneToMany } from "typeorm";
import moment from 'moment'
import Order from '@server/entities/Order'
import { Nullable } from "@server/shares/types"

@Entity({
  name: 'patient',
  synchronize: false
})
export default class Patient extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  public id: number

  @Column({ type: 'varchar', nullable: false, length: 255 })
  public name: string

  @OneToMany(() => Order, self => self.patient)
  public orders?: Nullable<Order[]>

  /**
   * @description version control
   */
  @VersionColumn({ type: 'integer', nullable: false })
  public readonly version: number

  /**
   * @description Time area
   */
  @CreateDateColumn({ type: 'timestamptz', nullable: false })
  public createdAt: moment.Moment

  @UpdateDateColumn({ type: 'timestamptz', nullable: false })
  public updatedAt: moment.Moment

  @DeleteDateColumn({ type: 'timestamptz', nullable: false })
  public deletedAt: moment.Moment

  @BeforeUpdate()
  setUpdateDate(): void {
    this.updatedAt = moment()
  }
}