
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { HashLoader } from 'react-spinners';
function App() {

    const[total,settotal]= useState("");
    const[name,setname]=useState([]);  /// name hm log useeffect se data set krrwane ke liye use krre h or kavi vi kisi ko need paregi to hm log name se data copy krr lenge
    const[sortname,setsortname]=useState([]); // sort wala data ke liye
    const[getname,setgetname]=useState([]);  // get karrne ke liye
    const[active,setactive]=useState(false); // aagrr hm getitem prr click krrte h to getitem walla render hooga nahi to sort wala 
    
    const[loader,setloader]=useState(false);

    useEffect(()=>{
           
         async function abc()
         {

             
            try {
              setloader(true);
               const response= await axios("https://dummyjson.com/user")
              
              
              settotal(response.data.users.length)
              
                let data=[];
              for(let i=0;i<response.data.users.length;i++)
              { 
                   let nm=response.data.users[i]  
                   data.push(nm.firstName+" "+nm.middleName+" "+nm.lastName);
                  
                  
              }
              
             setname(data)
             
            } catch (error) {
              console.log("server se data nhi aa raha h connection check krro" ,error);
            }
            finally
            {

              setloader(false);
            }
         }

         abc();

      },[])



      function handleSort() {
        const srtname = [...name];
        srtname.sort();
        
        setsortname(srtname);
        setactive(true);
      }
      
     
      function handlegetName()
      {
        let nisha=[...name];
        setgetname(nisha);
        setactive(false);
      }
  return (
    <>
    <div className="App">
       {loader && <HashLoader color="#36d7b7" />}
       <h1>{total}</h1>
       <h2>Total no. of users</h2>
       </div>
       <div className='btn'>
         <button onClick={handlegetName}>GetData</button>
         <button onClick={handleSort}>Sort</button>

       </div>
       <div className='container'>

        {
          active ?
          sortname.map((item,inx)=>(

              <li >{item}</li>

          ))
          :
          getname.map((item,inx)=>(

            <li >{item}</li>

        ))
       
         }
       </div>
  
    </>
  );
}

export default App;
