import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator'

export function IsUnsignedIntString(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    let errorMessage = `${propertyName} was not provided`
    registerDecorator({
      name: 'IsUnsignedIntString',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        defaultMessage(): string {
          return errorMessage
        },
        validate(value: any, args: ValidationArguments) {
          if (!value) return false
          const isNotDemcial = parseInt(value, 10) === Number(value)
          if (!isNotDemcial) {
            errorMessage = `${propertyName} ${value} is not a valid int64 format`
            return false
          }
          const isOutRange = Number(value) < 0
          if (isOutRange) {
            errorMessage = `${propertyName} ${value} is not a valid int64 format`
            return false
          }
          return true
        },
      },
    })
  }
}

export function IsQueryLimitOutRange(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    let errorMessage = `${propertyName} was not provided`
    registerDecorator({
      name: 'IsQueryLimitOutRange',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        defaultMessage(): string {
          return errorMessage
        },
        validate(value: any, args: ValidationArguments) {
          if (!value) return false
          const isOutRange = Number(value) > 100
          if (isOutRange) {
            errorMessage = `Limit must within 100`
            return false
          }
          return true
        },
      },
    })
  }
}