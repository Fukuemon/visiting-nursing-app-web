import { TextTab } from '@/app/_components/TextTab'
import { Toggle, ToggleStateType } from '@/app/_components/Toggle'
import { CalendarView, CalendarViewText } from '@/constants/calendarView'
import { ComponentPropsWithoutRef } from 'react'
import styles from './style.module.css'

export const RightControls: React.FC<{
  showCancel: ToggleStateType
  setShowCancel: (state: ToggleStateType) => void
}> = ({ showCancel, setShowCancel }) => {
  const tabs: ComponentPropsWithoutRef<typeof TextTab>['tabs'] = [
    {
      id: CalendarView.timeGridDay,
      label: CalendarViewText.timeGridDay,
    },
    {
      id: CalendarView.timeGridWeek,
      label: CalendarViewText.timeGridWeek,
    },
    {
      id: CalendarView.dayGridMonth,
      label: CalendarViewText.dayGridMonth,
    },
  ] as const
  return (
    <div className={styles.right}>
      <div className={styles.pullDown}>
        <TextTab tabs={tabs} defaultTabIndex={0} variant="white" />
      </div>
      <Toggle
        toggleState={showCancel}
        label="キャンセル予定表示"
        onClick={() =>
          setShowCancel(
            showCancel === ToggleStateType.CHECKED
              ? ToggleStateType.DEFAULT
              : ToggleStateType.CHECKED,
          )
        }
      />
    </div>
  )
}
