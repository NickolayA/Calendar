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