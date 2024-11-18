import { pagesPath } from '@/utils/$path'

export const LINKS = [
  { href: pagesPath.calendar.$url().path, label: 'カレンダー' },
  { href: '/patient', label: '患者' },
  { href: pagesPath.users.$url().path, label: '職員情報' },
  { href: '/indicators', label: '経営数値' },
]
