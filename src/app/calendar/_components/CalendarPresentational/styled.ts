import styled from '@emotion/styled'
export const StyleWrapper = styled.div`
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
  .fc .fc-scrollgrid {
    border-width: 0;
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
  .fc .fc-timegrid-slot .fc-timegrid-slot-label .fc-scrollgrid-shrink {
  }
  .fc .fc-timegrid-slot {
    height: 1.5em;
    line-height: 2.8em;
  }
  .fc table {
    font-size: 0.5em;
  }
  .fc .fc-v-event .fc-event-title {
    font-size: 4em;
  }
  .fc .fc-timegrid-event .fc-event-time {
    font-size: 2.5em;
  }
  .fc .fc-timegrid-event {
    border-width: 1px;
  }

  .fc .fc-event-main {
    border-width: 2px;
    padding: 3px;
  }

  .fc .fc-event-main:hover {
    opacity: 0.8;
  }

  .fc .fc-button {
    display: none;
  }
  .fc .fc-toolbar-title {
    display: none;
  }

  .fc .fc-daygrid-day-frame {
    font-size: 0.75rem;
    white-space: nowrap;
  }

  .fc .fc-daygrid-body tr {
    height: 120px;
  }

  // カレンダーのヘッダーを非表示
  .fc .fc-toolbar {
    display: none;
  }

  // 月表示カレンダーの高さを広げるように調整
  .fc-direction-ltr {
    height: 100%;
  }

  // 月表示カレンダーの高さを広げるように調整
  .fc-dayGridMonth-view.fc-view.fc-daygrid {
    height: 100%;
  }

  // 月表示カレンダーの高さを広げるように調整
  .fc-scrollgrid {
    height: 100%;
  }

  // 月表示カレンダーの高さを広げるように調整
  .fc-scroller-harness {
    height: 100%;
  }

  // 月表示カレンダーの高さを広げるように調整
  .fc-scroller {
    height: 100%;
  }

  // 月表示カレンダーの高さを広げるように調整
  .fc-daygrid-body.fc-daygrid-body-unbalanced.fc-daygrid-body-natural {
    height: 100%;
  }

  // 月表示カレンダーの高さを広げるように調整
  .fc .fc-scrollgrid-section-body table,
  .fc .fc-scrollgrid-section-footer table {
    height: 100%;
  }

  // 曜日の枠線
  .fc-scroller-harness .fc-col-header {
    box-shadow: 2px 0px 4px 0px rgba(0, 0, 0, 0.4);
    border: 1px var(--gray-200) solid;
  }

  // 曜日の枠線に影を追加
  .fc-scrollgrid-section.fc-scrollgrid-section-header.fc-scrollgrid-section-sticky {
    box-shadow: 2px 0px 4px 0px rgba(0, 0, 0, 0.4);
  }

  // 時間軸の枠線
  .fc-timegrid-col.fc-timegrid-axis {
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.4);
    border: 1px var(--gray-200) solid;
  }
`
