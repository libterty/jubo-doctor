import { Logger } from '@nestjs/common'
import * as Express from 'express'

export function memInfo(memName: string): void {
  Logger.log(
    `Function ${memName} used memory: ${Math.round(
      (process.memoryUsage().heapUsed / 1024 / 1024) * 100,
    ) / 100} MB`,
    'Memory-Info',
    true,
  )
}

export function isJsonString(str: string): boolean {
  try {
    const json = JSON.parse(str)
    return typeof json === 'object'
  } catch (error) {
    return false
  }
}

export function addMonths(date: Date, months: number) {
  const d = date.getDate()
  date.setMonth(date.getMonth() + +months)
  if (date.getDate() !== d) {
    date.setDate(0)
  }
  return date
}

export function isEmptyObj(obj: { [key: string]: any }): boolean {
  for (const property in obj) {
    // following es-lint rule no-prototype-builtins, do not access object prototype directly
    if (Object.prototype.hasOwnProperty.call(obj, property)) return false
  }
  return true
}
