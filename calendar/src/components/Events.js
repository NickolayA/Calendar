import React from "react";
import Event from "./Event";

class Events extends React.Component {
  extractEventsWithoutTime = () => {
    const eventsState = this.props.eventsState;
    const eventsComponentsWithoutTime = [];
    if (eventsState) {
      if ("annualEvents" in eventsState) {
        for (let annualEvent of eventsState["annualEvents"]) {
          eventsComponentsWithoutTime.push(
            <Event eventMessage={annualEvent} eventType={"annualEvents"} />
          );
        }
      }

      if ("currentEvents" in eventsState) {
        if ("notUsingTime" in eventsState["currentEvents"]) {
          for (let notUsingTime of eventsState["currentEvents"][
            "notUsingTime"
          ]) {
            eventsComponentsWithoutTime.push(
              <Event eventMessage={notUsingTime} eventType={"notUsingTime"} />
            );
          }
        }
      }
    }
    return eventsComponentsWithoutTime;
  };

  extractEventsWithTime = () => {
    const eventsState = this.props.eventsState;
    const eventsComponentsWithTime = [];
    let commonEventObject = {};
    let commonTimes = [];
    if (eventsState) {
      if ("currentEvents" in eventsState) {
        if (
          "eventStartTime" in eventsState["currentEvents"] &&
          "rangeTime" in eventsState["currentEvents"]
        ) {
          const rangeTimeEvents = eventsState["currentEvents"]["rangeTime"];
          const eventStartTime = eventsState["currentEvents"]["eventStartTime"];

          commonTimes = commonTimes.concat(Object.keys(eventStartTime));
          commonTimes = commonTimes.concat(Object.keys(rangeTimeEvents));

          commonTimes = [...new Set(commonTimes)];
          console.log(commonEventObject);
          for (let commonTime of commonTimes) {
            commonEventObject[commonTime] = [];

            if (commonTime in rangeTimeEvents) {
              commonEventObject[commonTime].push(rangeTimeEvents[commonTime]);
            }
            if (commonTime in eventStartTime) {
              commonEventObject[commonTime] = commonEventObject[
                commonTime
              ].concat(eventStartTime[commonTime]);
            }
          }

          const orderedCommonEventObject = {};
          Object.keys(commonEventObject)
            .sort()
            .forEach(key => {
              orderedCommonEventObject[key] = commonEventObject[key];
            });

          commonEventObject = orderedCommonEventObject;

          for (let commonTime in commonEventObject) {
            for (let eventMessage of commonEventObject[commonTime]) {
              if (typeof eventMessage === "string") {
                eventsComponentsWithTime.push(
                  <Event
                    eventMessage={eventMessage}
                    eventType={"eventStartTime"}
                    startTime={commonTime}
                  />
                );
              } else {
                for (let endTime in eventMessage) {
                  for (let eventMessageRange of eventMessage[endTime]) {
                    eventsComponentsWithTime.push(
                      <Event
                        eventMessage={eventMessageRange}
                        eventType={"rangeTime"}
                        startTime={commonTime}
                        endTime={endTime}
                      />
                    );
                  }
                }
              }
            }
          }
          return eventsComponentsWithTime;
        } else if ("eventStartTime" in eventsState["currentEvents"]) {
          let eventStartTime = eventsState["currentEvents"]["eventStartTime"];

          const orderedEventStartTime = {};
          Object.keys(eventStartTime)
            .sort()
            .forEach(key => {
              orderedEventStartTime[key] = eventStartTime[key];
            });

          eventStartTime = orderedEventStartTime;

          for (let time in eventStartTime) {
            for (let eventMessage of eventStartTime[time]) {
              eventsComponentsWithTime.push(
                <Event
                  eventMessage={eventMessage}
                  eventType={"eventStartTime"}
                  startTime={time}
                />
              );
            }
          }
          return eventsComponentsWithTime;
        } else if ("rangeTime" in eventsState["currentEvents"]) {
          let rangeTimeEvents = eventsState["currentEvents"]["rangeTime"];

          const orderedRangeTimeEvents = {};
          Object.keys(rangeTimeEvents)
            .sort()
            .forEach(key => {
              orderedRangeTimeEvents[key] = rangeTimeEvents[key];
            });

          rangeTimeEvents = orderedRangeTimeEvents;

          for (let startTime in rangeTimeEvents) {
            for (let endTime in rangeTimeEvents[startTime]) {
              for (let eventMessage of rangeTimeEvents[startTime][endTime]) {
                eventsComponentsWithTime.push(
                  <Event
                    eventMessage={eventMessage}
                    eventType={"eventStartTime"}
                    startTime={startTime}
                    endTime={endTime}
                  />
                );
              }
            }
          }
          return eventsComponentsWithTime;
        }
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="events"> {this.extractEventsWithTime()} </div>{" "}
        <div className="events"> {this.extractEventsWithoutTime()} </div>{" "}
      </React.Fragment>
    );
  }
}

export default Events;
