export const ccCategory = {
  normal: 'normal',
  accompany: 'accompany',
  handover: 'handover',
  none: 'none',
} as const

export type CcCategory = (typeof ccCategory)[keyof typeof ccCategory]

export const CcCategoryText: Record<CcCategory, string> = {
  [ccCategory.normal]: '通常',
  [ccCategory.accompany]: 'リハ同行',
  [ccCategory.handover]: '引き継ぎ',
  [ccCategory.none]: '複製しない',
} as const
