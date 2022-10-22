import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'
import { getRepository } from 'typeorm'
import Patient from '@server/entities/Patient'
import Order from '@server/entities/Order'
import { ObjectLiteral } from '@server/shares/types'

@ValidatorConstraint({ async: true })
export class IsPatientConstraint implements ValidatorConstraintInterface {
  protected errorMessage = 'Patient id is not provided'

  defaultMessage(): string {
    return this.errorMessage
  }

  private async checkIsPatient(id: string): Promise<Partial<Patient>> {
    return getRepository(Patient)
      .createQueryBuilder('share')
      .where('share.id = :id', { id })
      .andWhere('share.deletedAt IS NULL')
      .select(['share."id" AS "id"'])
      .getRawOne<Partial<Patient>>()
  }

  public async validate(id: string, args: ValidationArguments): Promise<boolean> {
    const isValid = await this.checkIsPatient(id)
    if (!isValid) {
      this.errorMessage = 'Patient id does not exist'
      return false
    }
    return true
  }
}
export function IsPatient(validationOptions?: ValidationOptions) {
  return function(object: ObjectLiteral, propertyName: string) {
    registerDecorator({
      name: 'IsPatient',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPatientConstraint,
    })
  }
}

@ValidatorConstraint({ async: true })
export class IsOrderConstraint implements ValidatorConstraintInterface {
  protected errorMessage = 'Order id is not provided'

  defaultMessage(): string {
    return this.errorMessage
  }

  private async checkIsOrder(id: string): Promise<Partial<Order>> {
    return getRepository(Order)
      .createQueryBuilder('share')
      .where('share.id = :id', { id })
      .andWhere('share.deletedAt IS NULL')
      .select(['share."id" AS "id"'])
      .getRawOne<Partial<Order>>()
  }

  public async validate(id: string, args: ValidationArguments): Promise<boolean> {
    const isValid = await this.checkIsOrder(id)
    if (!isValid) {
      this.errorMessage = 'Order id does not exist'
      return false
    }
    return true
  }
}
export function IsOrder(validationOptions?: ValidationOptions) {
  return function(object: ObjectLiteral, propertyName: string) {
    registerDecorator({
      name: 'IsOrder',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsOrderConstraint,
    })
  }
}
