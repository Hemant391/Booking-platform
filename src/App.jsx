
import MyShifts from './pages/Myshift';
import { useEffect, useState } from 'react';
import BookingTable from './pages/AvailableShifts';

function App() {
  const [data,setData]=useState([])
  const [availareas,setAvailareas]=useState({})
  const [pagerender,setPagerender]=useState('My Shifts')

  const fetchData = async () => {
   
    const response = await fetch(`http://127.0.0.1:8080/shifts`);
    
    const newData = await response.json();
    newData.sort((a,b)=>a.startTime-b.startTime)
    let st=new Set()
newData.map((ele)=>{
      if(!st.has(ele.area)){
       return st.add(ele.area)
      }
    })
    setAvailareas(Array.from(st))
    setData(newData)
  };

  useEffect(()=>{
    
    fetchData()

  },[])

  function handlepages(e){
    console.log(e.target.innerText)
    setPagerender(e.target.innerText)

  }
    return (
        <div className="container mx-auto">
          <div className="butt max-w-2xl mx-auto flex justify-start text-3xl gap-6">
            <button onClick={handlepages} className={pagerender=='My Shifts'?'highlight':'dull'}>My Shifts</button>
            <button onClick={handlepages} className={pagerender!='My Shifts'?'highlight':'dull'}>Available shifts</button>
          </div>
         {pagerender=='My Shifts'&&data.length>0&& (<MyShifts data={data} />)}  
         {pagerender=='Available shifts'&&data.length>0&& (<BookingTable fetchdata={data}  areas={availareas} />)}
        </div>
    );
}

export default App;
