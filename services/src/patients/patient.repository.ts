/* eslint-disable lines-between-class-members */
import { Inject } from '@nestjs/common'
import { Connection, EntityRepository, Repository, SelectQueryBuilder } from 'typeorm'
import Patient from '@server/entities/Patient'
import { QueryBaseDtos } from '@server/shares/dtos/paging.dto'
import Order from '@server/entities/Order'

@EntityRepository(Patient)
export class PatientRepository extends Repository<Patient> {
  protected connection!: Connection

  constructor(@Inject('CONNECTION') connection: Connection) {
    super()
    this.connection = connection
  }

  public async findPatients(queryBaseDtos: QueryBaseDtos) {
    const limit = Number(queryBaseDtos.limit)
    const offset = Number(queryBaseDtos.offset) * limit
    const qb: SelectQueryBuilder<Patient> = this.connection
      .getRepository(Patient)
      .createQueryBuilder('pt')
    if (queryBaseDtos.keyword) {
      qb.where('(pt.name = :keyword AND pt.deletedAt IS NULL)', { keyword: queryBaseDtos.keyword })
    }
    qb.innerJoin(Order, 'od', '(od."patientId" = pt.id AND od."deletedAt" IS NULL)')
    const count = await qb.getCount()
    const data = await qb
      .limit(limit)
      .offset(offset)
      .select([
        'pt."id" AS "id"',
        'pt."name" AS "name"',
        `(SELECT COALESCE(array_to_json(array_agg(od.id)), '[]')) AS "orderIds"`,
        'COUNT(od.id) AS "ordersAmount"',
      ])
      .groupBy('pt.id')
      .orderBy('pt."updatedAt"', 'DESC', 'NULLS LAST')
      .getRawMany()
    return {
      data,
      count,
    }
  }
}
