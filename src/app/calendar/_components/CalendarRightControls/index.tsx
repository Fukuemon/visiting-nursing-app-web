import { PullDown } from '@/app/_components/PullDown'
import { Toggle, ToggleStateType } from '@/app/_components/Toggle'
import {
  CALENDAR_VIEW_OPTIONS,
  CalendarView,
  CalendarViewText,
} from '@/constants/calendarView'
import styles from './style.module.css'

export const RightControls: React.FC<{
  currentCalendarView: CalendarView
  setCurrentCalendarView: (view: CalendarView) => void
  showCancel: ToggleStateType
  setShowCancel: (state: ToggleStateType) => void
}> = ({
  currentCalendarView,
  setCurrentCalendarView,
  showCancel,
  setShowCancel,
}) => (
  <div className={styles.right}>
    <div className={styles.pullDown}>
      <PullDown<CalendarView>
        initial={{
          value: CalendarView[currentCalendarView],
          label: CalendarViewText[currentCalendarView],
        }}
        options={CALENDAR_VIEW_OPTIONS}
        onChange={setCurrentCalendarView}
      />
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
