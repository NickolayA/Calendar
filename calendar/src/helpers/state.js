import store from "../store";

export const getEventsState = (eventsState, year, month, dayInMonthNumber) => {
  const index = `${year}${month}`;
  const resultEvents = {};
  dayInMonthNumber--;

  if ("annualEvents" in eventsState) {
    for (let firstAnnualEventYear in eventsState["annualEvents"]) {
      if (parseInt(firstAnnualEventYear) <= parseInt(year)) {
        if (month in eventsState["annualEvents"][firstAnnualEventYear]) {
          if (
            dayInMonthNumber in
            eventsState["annualEvents"][firstAnnualEventYear][month]
          ) {
            resultEvents["annualEvents"] =
              eventsState["annualEvents"][firstAnnualEventYear][month][
                dayInMonthNumber
              ];
          }
        }
      }
    }
  }

  if (index in eventsState) {
    if (dayInMonthNumber in eventsState[index]) {
      resultEvents["currentEvents"] = eventsState[index][dayInMonthNumber];
    }
  }

  if (
    resultEvents["currentEvents"] !== undefined ||
    resultEvents["annualEvents"] !== undefined
  ) {
    return resultEvents;
  } else {
    return null;
  }
};

export const addNewEventToCalendarState = (
  events,
  year,
  month,
  dayInMonthNumber,
  eventMessage,
  useTime,
  eventStartTime,
  eventEndTime,
  annualEvent,
  addIntersectedEvent
  //onEventsIntersectionDetection
) => {
  //console.log(onEventsIntersectionDetection, "addNewEventToCalendarState");
  const index = `${year}${month}`;
  console.log(store, "store");

  // check intersections
  if (eventStartTime && !eventEndTime) {
    try {
      if ("eventStartTime" in events[index][dayInMonthNumber - 1]) {
        for (let startTimeEvent in events[index][dayInMonthNumber - 1][
          "eventStartTime"
        ]) {
          if (eventStartTime === startTimeEvent) {
            if (!addIntersectedEvent) {
              events["eventIntersectionDetected"] = true;
              return events;
            } else {
              events["eventIntersectionDetected"] = false;
              events["addIntersectedEvent"] = false;
            }
          }
        }
      }
    } catch (e) {}

    try {
      // check intersections
      if ("rangeTime" in events[index][dayInMonthNumber - 1]) {
        for (let rangeStartTime in events[index][dayInMonthNumber - 1][
          "rangeTime"
        ]) {
          if (rangeStartTime === eventStartTime) {
            if (!addIntersectedEvent) {
              events["eventIntersectionDetected"] = true;
              return events;
            } else {
              events["eventIntersectionDetected"] = false;
              events["addIntersectedEvent"] = false;
            }
          } else if (rangeStartTime < eventStartTime) {
            for (let rangeEndTime in events[index][dayInMonthNumber - 1][
              "rangeTime"
            ][rangeStartTime]) {
              if (eventStartTime < rangeEndTime) {
                if (!addIntersectedEvent) {
                  events["eventIntersectionDetected"] = true;
                  return events;
                } else {
                  events["eventIntersectionDetected"] = false;
                  events["addIntersectedEvent"] = false;
                }
              }
            }
          }
        }
      }
    } catch (e) {}
  } else if (eventStartTime && eventEndTime) {
    try {
      if ("rangeTime" in events[index][dayInMonthNumber - 1]) {
        for (let rangeStartTime in events[index][dayInMonthNumber - 1][
          "rangeTime"
        ]) {
          if (rangeStartTime === eventStartTime) {
            if (!addIntersectedEvent) {
              events["eventIntersectionDetected"] = true;
              return events;
            } else {
              events["eventIntersectionDetected"] = false;
              events["addIntersectedEvent"] = false;
            }
          } else if (rangeStartTime < eventStartTime) {
            for (let rangeEndTime in events[index][dayInMonthNumber - 1][
              "rangeTime"
            ][rangeStartTime]) {
              if (eventStartTime < rangeEndTime) {
                if (!addIntersectedEvent) {
                  events["eventIntersectionDetected"] = true;
                  return events;
                } else {
                  events["eventIntersectionDetected"] = false;
                  events["addIntersectedEvent"] = false;
                }
              }
            }
          } else {
            for (let rangeEndTime in events[index][dayInMonthNumber - 1][
              "rangeTime"
            ][rangeStartTime]) {
              if (eventEndTime > rangeEndTime) {
                if (!addIntersectedEvent) {
                  events["eventIntersectionDetected"] = true;
                  return events;
                } else {
                  events["eventIntersectionDetected"] = false;
                  events["addIntersectedEvent"] = false;
                }
              }
            }
          }
        }
      }
    } catch (e) {}
    try {
      if ("eventStartTime" in events[index][dayInMonthNumber - 1]) {
        for (let startTimeEvent in events[index][dayInMonthNumber - 1][
          "eventStartTime"
        ]) {
          if (eventStartTime === startTimeEvent) {
            if (!addIntersectedEvent) {
              events["eventIntersectionDetected"] = true;
              return events;
            } else {
              events["eventIntersectionDetected"] = false;
              events["addIntersectedEvent"] = false;
            }
          } else if (
            eventStartTime < startTimeEvent &&
            startTimeEvent < eventEndTime
          ) {
            if (!addIntersectedEvent) {
              events["eventIntersectionDetected"] = true;
              return events;
            } else {
              events["eventIntersectionDetected"] = false;
              events["addIntersectedEvent"] = false;
            }
          }
        }
      }
    } catch (e) {}
  }

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
        // check intersection of time
        if (
          !(
            eventStartTime in
            events[index][dayInMonthNumber - 1]["eventStartTime"]
          )
        ) {
          console.log("sdf");
          events[index][dayInMonthNumber - 1]["eventStartTime"][
            eventStartTime
          ] = [eventMessage];
        } else {
          console.log("Event with the same startTime exists are you sure");

          events[index][dayInMonthNumber - 1]["eventStartTime"][
            eventStartTime
          ].push(eventMessage);
        }
      }
    }
  }

  return events;
};
