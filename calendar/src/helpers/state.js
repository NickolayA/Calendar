export const getEventsState = (eventsState, index, dayInMonthNumber) => {
    dayInMonthNumber--;
    if (eventsState[index] === undefined || eventsState[index][dayInMonthNumber] === undefined) {
        return null;
    } else {
        return eventsState;
    }
}