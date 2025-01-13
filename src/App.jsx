import React, { useState,useCallback, useEffect,useRef } from 'react';



const App = () => {
  //useState hooks
   const[length,setLength]=useState(8);
   const[numberAllowed,setNumberAllowed]=useState(false);
   const[charAllowed,setCharAllowed]=useState(false);
   const[password,setPassword]=useState(''); 

//useCallBack hooks
   const passwordGenerator=useCallback(()=>{
      let password="";
      let num="0123456789";
      let specialChar="!@#$%^&*()_+";
      let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      if(numberAllowed) str+=num;
      if(charAllowed) str+=specialChar;

      for(let i=1;i<=length;i++){
           let char=Math.floor(Math.random()*str.length+1);
            password+=str.charAt(char);
      }

      setPassword(password);

   },[length,numberAllowed,charAllowed,setPassword]);


   //useEffect Hook
   useEffect(()=>{
    passwordGenerator();
   },[length,numberAllowed,charAllowed,setPassword])

   //useRef Hook
      const PasswordRef=useRef(null);
    const copyPasstoClipBoard=useCallback(()=>{
      PasswordRef.current.select();
              window.navigator.clipboard.writeText(password);
    },[password]);

  return (
    <>
     <div className="width-full overflow-hidden max-w-md h-full mx-auto shadow-md rounded-lg px-4 py-2 my-8 text-orange-500 bg-slate-800">
      <h1 className="text-white text-center">Pasword Generator</h1>
     <div className="flex shadow-lg rounded-lg overflow-hidden mb-4">
             <input type="text" value={password}className="outline-none w-full py-1 px-3" placeholder="Password" readOnly ref={PasswordRef}/>
       <button className=" outline-none inline-block bg-blue-700 text-white px-3 py-0.5 shrink-0" onClick={copyPasstoClipBoard}>Copy</button>
     </div>
     
       <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
         
         <input type="range" min={8} max={30} value={length} className="cursor-pointer" onChange={(e)=>{setLength(e.target.value)}}/>
        <label>Length: ({length})</label>
        </div>

        <div className="flex items-center gap-x-1">
        <input type="checkbox" checked={numberAllowed} onChange={()=>{setNumberAllowed((prev)=>!prev)}}/>
        </div>
        <label>Numbers?</label>
        <div className="flex items-center gap-x-1">
        <input type="checkbox" checked={charAllowed} onChange={()=>{setCharAllowed((prev)=>!prev)}}/>
        </div>

        <label>Characters?</label>
       </div>
     
     </div>

   </>
  );
};

export default App;
