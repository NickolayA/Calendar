export const getEventsState = (eventsState, year, month, dayInMonthNumber) => {

    const index = `${year}${month}`;
    const resultEvents = {};
    dayInMonthNumber--;

    if ("annualEvents" in eventsState) {
        for (let firstAnnualEventYear in eventsState["annualEvents"]) {
            if (parseInt(firstAnnualEventYear) <= parseInt(year)) {
                if (month in eventsState["annualEvents"][firstAnnualEventYear]) {
                    if (dayInMonthNumber in eventsState["annualEvents"][firstAnnualEventYear][month]) {
                        resultEvents["annualEvents"] = eventsState["annualEvents"][firstAnnualEventYear][month][dayInMonthNumber];
                    }
                }
            }
        }
    }

    try {
        resultEvents["currentEvents"] = eventsState[index][dayInMonthNumber];
    } catch (e) {

    } finally {
        if (resultEvents["currentEvents"] !== undefined || resultEvents["annualEvents"] !== undefined) {
            return resultEvents;
        } else {
            return null;
        }
    }
}

export const addNewEventToCalendarState = (events, year,
    month,
    dayInMonthNumber,
    eventMessage,
    useTime,
    eventStartTime,
    eventEndTime,
    annualEvent) => {
    const index = `${year}${month}`;

    if (annualEvent) {
        //const indexAnnual = index + `${dayInMonthNumber - 1}`;
        if (!("annualEvents" in events)) {
            events["annualEvents"] = {};
            events["annualEvents"][year] = {};
            events["annualEvents"][year][month] = {};
            events["annualEvents"][year][month][dayInMonthNumber - 1] = [
                eventMessage
            ];
        } else if (!(year in events["annualEvents"])) {
            events["annualEvents"][year] = {};
            events["annualEvents"][year][month] = {};
            events["annualEvents"][year][month][dayInMonthNumber - 1] = [
                eventMessage
            ];
        } else if (events["annualEvents"][year][month] === undefined) {
            events["annualEvents"][year][month] = {};
            events["annualEvents"][year][month][dayInMonthNumber - 1] = [
                eventMessage
            ];
        } else if (
            events["annualEvents"][year][month][dayInMonthNumber - 1] === undefined
        ) {
            events["annualEvents"][year][month][dayInMonthNumber - 1] = [
                eventMessage
            ];
        } else {
            events["annualEvents"][year][month][dayInMonthNumber - 1].push(
                eventMessage
            );
        }
    } else {
        if (!(index in events)) {
            events[index] = [];
            events[index][dayInMonthNumber - 1] = {};
        } else if (!(dayInMonthNumber - 1 in events[index])) {
            events[index][dayInMonthNumber - 1] = {};
        }

        if (
            eventStartTime &&
            eventEndTime &&
            !("rangeTime" in events[index][dayInMonthNumber - 1])
        ) {
            events[index][dayInMonthNumber - 1]["rangeTime"] = {};
            events[index][dayInMonthNumber - 1]["rangeTime"][eventStartTime] = {};
            events[index][dayInMonthNumber - 1]["rangeTime"][eventStartTime][
                eventEndTime
            ] = [eventMessage];
        } else if (
            eventStartTime &&
            eventEndTime &&
            "rangeTime" in events[index][dayInMonthNumber - 1]
        ) {
            if (
                !(eventStartTime in events[index][dayInMonthNumber - 1]["rangeTime"])
            ) {
                events[index][dayInMonthNumber - 1]["rangeTime"][eventStartTime] = {};
                events[index][dayInMonthNumber - 1]["rangeTime"][eventStartTime][
                    eventEndTime
                ] = [eventMessage];
            } else if (
                eventStartTime in events[index][dayInMonthNumber - 1]["rangeTime"]
            ) {
                if (
                    !(
                        eventEndTime in
                        events[index][dayInMonthNumber - 1]["rangeTime"][eventStartTime]
                    )
                ) {
                    events[index][dayInMonthNumber - 1]["rangeTime"][eventStartTime][
                        eventEndTime
                    ] = {};
                    events[index][dayInMonthNumber - 1]["rangeTime"][eventStartTime][
                        eventEndTime
                    ] = [eventMessage];
                } else {
                    events[index][dayInMonthNumber - 1]["rangeTime"][eventStartTime][
                        eventEndTime
                    ].push(eventMessage);
                }
            }
        } else if (!useTime || !eventStartTime) {
            if (!("notUsingTime" in events[index][dayInMonthNumber - 1])) {
                events[index][dayInMonthNumber - 1]["notUsingTime"] = [eventMessage];
            } else {
                events[index][dayInMonthNumber - 1]["notUsingTime"].push(eventMessage);
            }
        } else {
            if (
                !("eventStartTime" in events[index][dayInMonthNumber - 1]) &&
                !eventEndTime
            ) {

                events[index][dayInMonthNumber - 1]["eventStartTime"] = {};
                events[index][dayInMonthNumber - 1]["eventStartTime"][
                    eventStartTime
                ] = [eventMessage];
            } else if (
                "eventStartTime" in events[index][dayInMonthNumber - 1] &&
                !eventEndTime
            ) {
                if (
                    !(
                        eventStartTime in
                        events[index][dayInMonthNumber - 1]["eventStartTime"]
                    )
                ) {
                    events[index][dayInMonthNumber - 1]["eventStartTime"][
                        eventStartTime
                    ] = [eventMessage];
                } else {
                    events[index][dayInMonthNumber - 1]["eventStartTime"][
                        eventStartTime
                    ].push(eventMessage);
                }
            }
        }
    }

    return events;
}

export const prepareEventsForShowing = (eventsState) => {
    console.log(eventsState)
    if ("annualEvents" in eventsState) {

    }

    if ("currentEvents" in eventsState) {

    }
}