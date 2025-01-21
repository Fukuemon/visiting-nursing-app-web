import { scheduleType } from './scheduleType'

export const eventBackgroundColorCode = {
  [scheduleType.normal]: 'green',
  [scheduleType.visit]: 'blue',
  [scheduleType.visitRecalling]: 'blue',
  [scheduleType.normalRecalling]: 'green',
  canceled: '#fff2f2',
}