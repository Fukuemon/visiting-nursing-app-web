import styled from '@emotion/styled'
export const TimeGridDayStyleWrapper = styled.div`
  height: 100%; // 高さを画面下まで広げる
  .fc .fc-toolbar.fc-header-toolbar {
    margin-bottom: 0;
  }
  .fc .fc-toolbar-title {
    font-size: 1rem;
    color: #37362f;
  }
  .fc .fc-button-primary {
    font-size: 1rem;
    background-color: #ffffff00;
    color: #acaba9;
    border: none;
    outline: none;
  }
  .fc .fc-today-button {
    background-color: #ffffff00;
    color: #37362f;
    border: none;
    outline: none;
  }
  .fc .fc-button-primary:not(:disabled):active,
  .fc .fc-button-primary:not(:disabled).fc-button-active {
    background-color: #ffffff00;
    color: #acaba9;
    box-shadow: none;
  }
  .fc .fc-button-primary:not(:disabled):focus,
  .fc .fc-button-primary:not(:disabled).fc-button-focus {
    background-color: #ffffff00;
    color: #acaba9;
    box-shadow: none;
  }
  .fc .fc-today-button:disabled {
    opacity: 1;
  }
  .fc .fc-col-header-cell {
    font-size: 0.75rem;
    font-weight: normal;
    color: #b6b5b3;
    border: none;
  }

  .fc .fc-scrollgrid-section > * {
    border: none;
  }

  .fc .fc-scrollgrid-sync-table {
    border: 1px;
  }
  .fc .fc-timegrid-slot-label-cushion.fc-scrollgrid-shrink-cushion {
    font-size: 0.75rem;
    line-height: 1rem;
    color: #acaba9;
  }

  // 日付カレンダーの時間軸の高さを調整
  .fc .fc-timegrid-slot.fc-timegrid-slot-lane {
    height: 17px;
    line-height: 0px;
  }

  .fc table {
    font-size: 0.5em;
  }
  .fc .fc-v-event .fc-event-title {
    font-size: 4em;
  }
  .fc .fc-event-main {
    border-width: 2px;
    padding: 3px;
  }

  .fc .fc-event-main:hover {
    opacity: 0.8;
  }
  .fc .fc-timegrid-event .fc-event-time {
    font-size: 2em;
  }
  .fc .fc-button {
    display: none;
  }
  .fc .fc-toolbar-title {
    display: none;
  }
  .fc .fc-col-header-cell-cushion {
    display: none;
  }

  // カレンダーの時間軸（time axis）のラベルを非表示
  .fc-timegrid-slot-label {
    display: none;
  }

  // カレンダーのheaderを非表示
  .fc-header-toolbar.fc-toolbar {
    display: none;
  }

  // カレンダーの左側の線を非表示
  .fc-timegrid-col.fc-timegrid-axis {
    border: none;
  }
`
