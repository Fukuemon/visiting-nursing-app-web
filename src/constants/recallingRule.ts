import type { RecallingRule } from '@/types/recallingRule'

export const RecallingFrequency = {
  everyWeek: 'everyWeek',
  everyOtherWeek: 'everyOtherWeek',
  onceAMonth: 'onceAMonth',
} as const

export enum recallingFrequency {
  Weekly= 'Weekly',
  Monthly= 'Monthly',
}

export type RecallingFrequency =
  (typeof RecallingFrequency)[keyof typeof RecallingFrequency]

export const RecallingFrequencyText: Record<RecallingFrequency, string> = {
  [RecallingFrequency.everyWeek]: '週一',
  [RecallingFrequency.everyOtherWeek]: '隔週',
  [RecallingFrequency.onceAMonth]: '月一',
} as const

export const recallingTextFromRule = (recalling_rule: RecallingRule) => {
  if (
    recalling_rule.frequency === 1 &&
    recalling_rule.interval === 1 &&
    recalling_rule.dayOfWeek !== undefined
  ) {
    return RecallingFrequencyText[RecallingFrequency.everyWeek]
  }
  if (
    recalling_rule.frequency === 1 &&
    recalling_rule.interval === 2 &&
    recalling_rule.dayOfWeek !== undefined
  ) {
    return RecallingFrequencyText[RecallingFrequency.everyOtherWeek]
  }
  if (
    recalling_rule.frequency === 1 &&
    recalling_rule.interval === 1 &&
    recalling_rule.dayOfMonth !== undefined
  ) {
    return RecallingFrequencyText[RecallingFrequency.onceAMonth]
  }
  return RecallingFrequencyText[RecallingFrequency.everyWeek]
}
