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



    // if ((eventsState[index] === undefined || eventsState[index][dayInMonthNumber] === undefined) && !("annualEvents" in resultEvents)) {
    //     return null;
    // } else {
    //     console.log(resultEvents)
    //     resultEvents["currentEvents"] = eventsState[index][dayInMonthNumber];
    //     return resultEvents;
    // }

    try {
        resultEvents["currentEvents"] = eventsState[index][dayInMonthNumber];
    } catch (e) {
        console.log(e);
    } finally {

        if (Object.keys(resultEvents).length) {
            return resultEvents;
        } else {
            return null;
        }
    }
}