const ServiceCode = {
  訪看I1: '訪看I1',
  訪看I2: '訪看I2',
  訪看I3: '訪看I3',
  医療: '医',
} as const

export type ServiceCode = (typeof ServiceCode)[keyof typeof ServiceCode]

export const ServiceCodeText: Record<ServiceCode, string> = {
  [ServiceCode.訪看I1]: '訪看I1',
  [ServiceCode.訪看I2]: '訪看I2',
  [ServiceCode.訪看I3]: '訪看I3',
  [ServiceCode.医療]: '医',
} as const

export const ServiceCodeDuration: Record<ServiceCode, number> = {
  [ServiceCode.訪看I1]: 29,
  [ServiceCode.訪看I2]: 59,
  [ServiceCode.訪看I3]: 89,
  [ServiceCode.医療]: 30,
} as const
