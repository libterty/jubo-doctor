import { Entity, BaseEntity, PrimaryGeneratedColumn, VersionColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BeforeUpdate, Column, Index, ManyToOne, JoinColumn, RelationId } from "typeorm";
import moment from 'moment'
import Patient from '@server/entities/Patient'

@Entity({
  name: 'order',
  synchronize: false
})
export default class Order extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  public id: string

  @Column({ type: 'varchar', nullable: false })
  public message: string

  @Index({ where: '"deletedAt" IS NULL' })
  @ManyToOne(
    () => Patient,
    { nullable: false, onDelete: 'CASCADE', orphanedRowAction: 'delete' }
  )
  @JoinColumn({ name: 'patientId', referencedColumnName: 'id' })
  public patient: Patient
  @RelationId((self: Order) => self.patient)
  public patientId: string

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