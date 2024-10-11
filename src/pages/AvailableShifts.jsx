import React, { useEffect, useState } from "react";
import { formatTime, getDayCategory } from "./functionused";
import "../App.css";
import greenspinner from '../../assets/spinner_green.svg';
import redspinner from '../../assets/spinner_red.svg';

const BookingTable = ({ fetchdata, areas }) => {
  const [datashow, setDatashow] = useState(fetchdata);
  const [filtername, setFiltername] = useState("Helsinki");
  const [redisloading,setRedIsloading]=useState(false)
  const [greenisloading,setGreenIsloading]=useState(false)

  function filterdata(areaname) {
    let filterdata = fetchdata.filter((ele) => ele.area == areaname);
    setDatashow(filterdata);
  }

  function displayrow(dataarr){
    let ui= dataarr.length > 0 ? (
         dataarr.map((event,ind) => (
             
           <tr key={event.id} className="border-b h-16 ">
 
             <td
               className="py-2 text-lg flex flex-col text-left"
               style={{ color: "#4F6C92" }}
             >
               {" "}
               {formatTime(event.startTime)}-{formatTime(event.endTime)}
             </td>
             <td className="py-2 text-right">
                 
                 {ind>=1 && event.startTime<dataarr[ind-1].endTime&&( 
                     <span className="mx-4" style={{color:"#E2006A"}}>Overlapping</span>)
                 }
                 {event.booked == false ? (
                   <button 
                     onClick={() => bookhandle(event)}
                     className={`  rounded-full border px-6 py-2 border-[#55CB82] text-lg ${ind>=1 && event.startTime<dataarr[ind-1].endTime&&"disabled"} ` }
                     style={{ color: "#16A64D" }}
                     disabled={ind>=1 && event.startTime<dataarr[ind-1].endTime&&true}
                     
                   >
                    {!greenisloading?(<p>Book</p>):(<img src={greenspinner} />)}
                     
                   </button>
                 ) : (
                   <>
                     <button
                       className="mx-3 text-xl"
                       style={{ color: "#4F6C92" }}
                     >
                       Booked
                     </button>
                     <button
                       className="text-blue-600  rounded-full border px-6 py-2 border-[#E2006A] text-lg "
                       style={{ color: "#E2006A" }}
                       onClick={()=>cancelhandle(event)}
                     >
                        {!redisloading?(<p>Cancel</p>):(<img src={redspinner} />)}
                     </button>
                   </>
                 )}
             </td>
             <th></th>
           </tr>
         ))
       ) : (
         <tr>
           <td>No events </td>
         </tr>
       )
       return ui
   }

  function bookhandle(e) {
    setGreenIsloading(true)
    let bookdata = datashow.map((ele) => {
        if (ele.id == e.id) {
            ele.booked = true;
        }
        return ele;
    });
    setDatashow(bookdata);
    setGreenIsloading(false)
  }
  function cancelhandle(e) {
      setRedIsloading(true)
      let bookdata = datashow.map((ele) => {
          if (ele.id == e.id) {
              ele.booked = false;
            }
            return ele;
        });
        setDatashow(bookdata);
        setRedIsloading(false)
  }

  function handlefilterclick(e) {
    filterdata(e.target.innerText);
    setFiltername(e.target.innerText);
  }
  useEffect(() => {
    filterdata(filtername);
  }, []);

  const todayEvents = [];
  const tomorrowEvents = [];
  const futureEvents = {};
  datashow.forEach((event) => {
    const category = getDayCategory(event.startTime);

    if (category === "today") {
      todayEvents.push(event);
    } else if (category === "tomorrow") {
      tomorrowEvents.push(event);
    } else {
      if (!futureEvents[category]) {
        futureEvents[category] = [];
      }
      futureEvents[category].push(event);
    }
  });

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-around my-4">
        {Array.from(areas).map((ele, ind) => (
          <button
            key={ind + "3"}
            className={filtername == ele ? "highlight" : "dull"}
            onClick={handlefilterclick}
          >
            {ele}{" "}
          </button>
        ))}
      </div>
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
        <thead className="h-14 " style={{ backgroundColor: "#F1F4F8" }}>
          <tr className="text-left">
            <th className="p-2 " style={{ color: "#4F6C92" }}>
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
        {Object.keys(futureEvents).map((date, ind) =>(
          <React.Fragment key={ind}>
          
            <thead
              key={date}
              className="h-14 "
              style={{ backgroundColor: "#F1F4F8" }}
            >
              <tr className="text-left">
                <th className="p-2 " style={{ color: "#4F6C92" }}>
                  {date}
                  <span className="text-sm px-2" style={{ color: "#CBD2E1" }}>
                    {futureEvents[date].length} shifts
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

export default BookingTable;
