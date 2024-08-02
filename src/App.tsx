import React, { useState, useEffect } from 'react';
import "./index.css"
import bgImg from "./asset/d09c4cfd1b93cc66dc13c8b461fd2145.jpg"
import ReconnectingWebSocket from 'reconnecting-websocket';
// import car
import car1 from "./asset/sleek-convertible-sports-car-7l4vu2otm7i6hqti.png"
import { FaCarSide } from "react-icons/fa6";
const Dashboard: React.FC = () => {

  const [data, setData] = useState(null);
  const [numPlayers, setNumPlayers] = useState<number>(1);
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [finishTimes, setFinishTimes] = useState<{ player: string; time: number }[]>([]);
  console.log("finishTimes::::",finishTimes)
  const [raceInProgress, setRaceInProgress] = useState<boolean>(false);
  const [progress, setProgress] = useState<number[]>([]);
  const [showData,setShowData]=useState<any>(true)
  console.log("showData:::",showData)
  const [startTime, setStartTime] = useState<number>(0); // Track the start time of the race
  const [buttonClicked, setButtonClicked] = useState(false);
  console.log("buttonClicked::::",buttonClicked)
  const colors = ['#FFCCCC', '#CCFFCC', '#CCCCFF', '#FFFFCC', '#FFCCFF', '#FFDDC1', '#C1FFC1', '#C1C6FF', '#FFECDA', '#D8BFD8'];

  const handleGenerateNames = () => {
    // setShowData(false)
    if (numPlayers > 0) {
      setPlayerNames(Array(numPlayers).fill(''));
      setProgress(Array(numPlayers).fill(0));
    }
  };

  const handleStartRace = () => {
    setFinishTimes([]);
    setProgress(Array(playerNames.length).fill(0));
    setRaceInProgress(true);
    setStartTime(Date.now()); // Record the start time
  };

  const handlePlayerNameChange = (index: number, value: string) => {
    const newPlayerNames = [...playerNames];
    newPlayerNames[index] = value;
    setPlayerNames(newPlayerNames);
  };

  const handleNumPlayersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setNumPlayers(isNaN(value) ? 1 : value);
  };

//   useEffect(() => {
//     let interval: NodeJS.Timeout;
// if(buttonClicked){
//   if (raceInProgress) {
//     interval = setInterval(() => {
//       setProgress(prevProgress => {
//         const newProgress = [...prevProgress];
//         console.log("newProgress:::::",newProgress)
//         let allFinished = true;

//         for (let i = 0; i < newProgress.length; i++) {
//           if (newProgress[i] < 100) {
//             allFinished = false;
//             newProgress[i] += Math.random() * 10; // Simulate progress -->Untill and unless we dont touch this random values will stored into progress state we have to stored here our getting data of alchol 

//             //Below code will run when anyone will touch to 100 
//             if (newProgress[i] >= 100) {
//               newProgress[i] = 100;
//               const finishTime = Date.now() - startTime;
//               //One By One Player will 
//               setFinishTimes(prevTimes => [...prevTimes, { player: playerNames[i] || `Player ${i + 1}`, time: finishTime }]);
//             }
//           }
//         }

//         if (allFinished) {
//           clearInterval(interval);
//           setRaceInProgress(false);
//           setShowData(false)
//         }

//         return newProgress;
//       });
//     }, 1000);
    
//   }
// }
   

//     return () => clearInterval(interval);
//   }, [raceInProgress, playerNames, startTime,buttonClicked]);
  // raceInProgress, playerNames, startTime
  const handleReload=()=>{
    window.location.reload();

  }

//   function handleEnterKey(event:any) {
//     if (event.key === 'Enter') {
//         console.log('Enter key pressed!');
//         // You can call any other function here
//         // myFunction();
//     }
// }
 // Function to call when Enter key is pressed
 const handleEnterPress = (event:any) => {
  if (event.key === 'Enter') {
    event.preventDefault(); // Optional: Prevent default behavior if needed
    handleFunction(); // Call your desired function
  }
};

// Function to be executed when Enter key is pressed
const handleFunction = () => {
  console.log('Enter key was pressed!');
  setProgress(prevProgress => {
    const newProgress = [...prevProgress];
    console.log("newProgress:::::",newProgress)
    let allFinished = true;

    for (let i = 0; i < newProgress.length; i++) {
      if (newProgress[i] < 100) {
        allFinished = false;
        newProgress[i] += Math.random() * 10; // Simulate progress -->Untill and unless we dont touch this random values will stored into progress state we have to stored here our getting data of alchol 

        //Below code will run when anyone will touch to 100 
        if (newProgress[i] >= 100) {
          newProgress[i] = 100;
          const finishTime = Date.now() - startTime;
          //One By One Player will 
          setFinishTimes(prevTimes => [...prevTimes, { player: playerNames[i] || `Player ${i + 1}`, time: finishTime }]);
        }
      }
    }
      //  setRaceInProgress(false);
      // setShowData(false)

    if (allFinished) {
      // clearInterval(interval);
      setRaceInProgress(false);
      setShowData(false)
    }

    return newProgress;
  });
  // setButtonClicked(true)
  // You can replace this with any action you need
};

// Set up global keydown listener on component mount
useEffect(() => {
  window.addEventListener('keydown', handleEnterPress);

  // Cleanup the event listener on component unmount
  return () => {
    window.removeEventListener('keydown', handleEnterPress);
  };
}, []); // Empty dependency array ensures this runs only once on mount and unmount




  return (
    <div className=" "  style={{
      backgroundImage: `url(${bgImg})`,
      backgroundSize: "cover",         // Ensures the background image covers the entire container
      backgroundPosition: "center",    // Centers the background image
      backgroundRepeat: "no-repeat",   // Prevents the background image from repeating
      backgroundAttachment: "fixed",   // Keeps the background fixed (optional)
      height: '100vh',                 // Ensures the container height covers the viewport height
      width: '100vw',                  // Ensures the container width covers the viewport width
      margin: 0,                       // Removes default margin
      padding: 0,                      // Removes default padding
      overflow: 'hidden',              // Prevents scrollbars if not necessary
    }}>
      {/* <img src={car}/> */}
      {/* <FaCarSide/> */}
      <h1 className="text-5xl font-extrabold text-center mb-12 mt-8 text-gray-800 bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent leading-tight shadow-md transform transition-transform duration-300 hover:scale-105">
  Starkenn Alcohol Race
</h1>

      {
        showData && <><div id="inputSection" className="mb-6 text-center">
        <label htmlFor="numPlayers" className="block text-2xl mb-2 font-bold to-blue-500">Enter number of players</label>
        <input
          type="number"
          id="numPlayers"
          min="1"
          max="10"
          value={numPlayers}
          onChange={handleNumPlayersChange}
          className="border p-2 text-lg w-16 text-center"
        />
        <button
          id="generateNames"
          onClick={handleGenerateNames}
          className=" text-white py-2 px-4 rounded mt-4 bg-green-500"
        >
          Generate Player Names
        </button>
      </div></>
      }
        
   
      
        {/* {
        showData &&  */}

      {playerNames.length > 0 && !raceInProgress && showData && (
        <div id="namesSection" className="mb-6">
          <h2 className="text-2xl mb-4 text-center font-bold to-blue-500">Enter Player Names</h2>
          <div id="playerNamesContainer">
            {playerNames?.map((name, index) => (
              <input
                key={index}
                type="text"
                className="block border p-2 mb-2 text-lg w-64 mx-auto"
                value={name}
                placeholder={`Player ${index + 1} Name`}
                onChange={(e) => handlePlayerNameChange(index, e.target.value)}
              />
            ))}
          </div>
          <div className='text-center'> {
            showData ? <button
            id="startRace"
            onClick={handleStartRace}
            className="bg-green-500 text-white py-2 px-4 rounded mt-4 hover:bg-green-600"
          >
            Start Race
          </button>:"Restart"
          }</div>
         
          {/* <button
            id="startRace"
            onClick={handleStartRace}
            className="bg-green-500 text-white py-2 px-4 rounded mt-4 hover:bg-green-600"
          >
            Start Race
          </button> */}
         
          
          
        </div>
        

        
      )}

 {/* <div id="raceTrack" className="w-4/5 mx-auto">
          {playerNames.map((_, index) => (
            <div key={index} className="relative w-full my-2 border-2 border-black rounded ">
              <div
                className="absolute h-full text-center text-white font-bold leading-10 rounded"
                style={{
                  width: `${progress[index]}%`,
                  backgroundColor: colors[index % colors.length],
                }}
              >
                {`${playerNames[index] || `Player ${index + 1}`}: ${Math.round(progress[index])}%`}
              </div>
            </div>
          ))}
        </div> */}
      {raceInProgress && (
       
        <div id="raceTrack" className="w-4/5 mx-auto">
  {playerNames.map((_, index) => (
    <div key={index} className="relative w-full my-2 border-4 bg-slate-300 rounded-lg border-r-4 border-r-red-500 " style={{ height: '80px' }}>
      <div
        className="absolute progress-bar text-center text-white font-bold leading-10 rounded"
        style={{
          width: `${progress[index]}%`,
          // backgroundColor: colors[index % colors.length],
          height: '100%', // Ensure it takes up the full height of the parent
        }}
      >
        {/* {`${playerNames[index] || `Player ${index + 1}`}: ${Math.round(progress[index])}%`}
         */}
         <div
      className="absolute"
      style={{
        left: `calc(${progress[index]}% - 20px)`, // Adjust -20px based on the carc icon width
        top: '50%', // Center vertically
        transform: 'translateY(-50%)', // Center vertically
        transition: 'left 0.3s ease' // Smooth transition for movement
      }}
    >
       {/* <FaCarSide className='text-rose-500 text-6xl'/> */}
     
       <img src={car1} className='max-w-[120px]'/>
    </div>
      </div>
    </div>
  ))}
</div>

       )}  

      {!raceInProgress && finishTimes.length > 0 && (
        <div className="text-center">
          <h2 id="winner" className="text-3xl text-stone-50 mb-4 font-bold">Winner: {finishTimes[0]?.player}</h2>
          <table id="leaderboard" className="w-4/5 mx-auto border-collapse mt-10">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Rank</th>
                <th className="border px-4 py-2">Player</th>
                <th className="border px-4 py-2">Time (ms)</th>
              </tr>
            </thead>
            <tbody>
              {finishTimes.map((entry, index) => (
                <tr key={index} className="bg-gray-100">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{entry?.player}</td>
                  <td className="border px-4 py-2">{entry?.time} ms</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            id="startRace"
            onClick={handleReload
            }
            className="bg-green-500 text-white py-2 px-4 rounded mt-4 hover:bg-green-600"
          >
            Start Again
          </button>
        </div>
      )}

{/* {
            showData ? <button
            id="startRace"
            onClick={handleStartRace}
            className="bg-green-500 text-white py-2 px-4 rounded mt-4 hover:bg-green-600"
          >
            Restart
          </button>:null
          } */}
{/* <button
            id="startRace"
            onClick={handleEnterKey
            }
            className="bg-green-500 text-white py-2 px-4 rounded mt-4 hover:bg-green-600"
          >
            Start Again
          </button> */}

    </div>
  );
};

export default Dashboard;


// import { useState } from "react";
// import Dashboard from "./Dashboard";

// const App: React.FC = () => {
//   const [count,setcount]=useState<any>(1)
//   return(
//       <>
//       {
//         count==1 && <Dashboard/>
//       }
//       {
//         count==2 && <Dashboard/>
//       }
      
//       </>
    
//     )
  
//   }
  
//   export default App;