import styled from '@emotion/styled'
export const TimeGridDayStyleWrapper = styled.div`
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
    font-size: 2.5em;
  }
  .fc .fc-timegrid-event .fc-event-time {
    font-size: 2.5em;
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
  .fc .fc-timegrid-slot-label {
    visibility: hidden;
  }
  // .fc .fc-scrollgrid-shrink-frame {
  //   display: none;
  //   width: 1px;
  // }
`
