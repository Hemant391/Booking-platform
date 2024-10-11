import React, { useState } from "react";
import { formatTime, getDayCategory } from "./functionused";

const MyShifts = ({ data }) => {
  const [showdata, setShowdata] = useState(data);

  function handlecancle(event) {
    const newdata = showdata.filter((ele) => {
      if (ele.id == event.id) return false;
      return true;
    });
    setShowdata(newdata);
  }

  function displayrow(dataarr){
    let ui=dataarr.length > 0 ? (
        dataarr.map((event) => (
         
            <tr key={event.id} className="border-b h-16 ">
              <td
                className="py-2 text-lg flex flex-col text-left"
                style={{ color: "#4F6C92" }}
              >
                {" "}
                <span>
                  {formatTime(event.startTime)}-{formatTime(event.endTime)}
                </span>{" "}
                <span style={{ color: "#CBD2E1" }}>{event.area}</span>
              </td>
              <td className="py-2 text-right">
                {!(datenow >= event.startTime) ? (
                  <button
                    onClick={() => handlecancle(event)}
                    className="text-blue-600  rounded-full border px-6 py-2 border-[#E2006A] text-lg "
                    style={{ color: "#E2006A" }}
                  >
                    Cancel
                  </button>
                ) : (
                  <button
                    className="text-blue-600  rounded-full border px-6 py-2 border-[#EED2DF] text-lg "
                    style={{ color: "#EED2DF" }}
                    disabled
                  >
                    Cancel
                  </button>
                )}
              </td>
            </tr>
        ))

      ) : (
        <tr><td>No events </td></tr>
      )
      return ui;
  }
  const datenow = new Date();
  const todayEvents = [];
  const tomorrowEvents = [];
  const futureEvents = {};
  showdata.forEach((event) => {
    const category = getDayCategory(event.startTime);

    if (category === "today") {
      todayEvents.push(event);
    } else if (category === "tomorrow") {
      tomorrowEvents.push(event);
    } else {
      // If it's a future day, add it under the correct date
      if (!futureEvents[category]) {
        futureEvents[category] = [];
      }
      futureEvents[category].push(event);
    }
  });

  return (
    <div className="max-w-2xl mx-auto flex justify-center items-center">
      <table className="table-auto text-lg w-full  border rounded ">
        <thead className="h-14 " style={{ backgroundColor: "#F1F4F8" }}>
          <tr className="text-left">
            <th className="p-2 " style={{ color: "#4F6C92" }}>
              Today
              <span className="text-sm px-2" style={{ color: "#CBD2E1" }}>
                {todayEvents.length} shifts
              </span>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {displayrow(todayEvents)}
        </tbody>
        <thead className="h-14  " style={{ backgroundColor: "#F1F4F8" }}>
          <tr className="text-left">
            <th className="p-2 w-full" style={{ color: "#4F6C92" }}>
              Tomorrow
              <span className="text-sm px-2" style={{ color: "#CBD2E1" }}>
                {tomorrowEvents.length} shifts
              </span>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {displayrow(tomorrowEvents)}
        </tbody>
        {Object.keys(futureEvents).map((date, index) => (
          <React.Fragment key={index}>
            <thead className="h-14 " style={{ backgroundColor: "#F1F4F8" }}>
              <tr className="text-left">
                <th className="p-2 " style={{ color: "#4F6C92" }}>
                  {date}
                  <span className="text-sm px-2" style={{ color: "#CBD2E1" }}>
                    {date.length} shifts
                  </span>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {displayrow(futureEvents[date])}
           
            </tbody>
          </React.Fragment>
        ))}
      </table>
    </div>
  );
};

export default MyShifts;
