import React, { useState, useEffect } from 'react';
import "./index.css"

const Dashboard: React.FC = () => {
  const [numPlayers, setNumPlayers] = useState<number>(1);
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [finishTimes, setFinishTimes] = useState<{ player: string; time: number }[]>([]);
  console.log("finishTimes::::",finishTimes)
  const [raceInProgress, setRaceInProgress] = useState<boolean>(false);
  const [progress, setProgress] = useState<number[]>([]);
  console.log("progress:::",progress)
  const [startTime, setStartTime] = useState<number>(0); // Track the start time of the race

  const colors = ['#FFCCCC', '#CCFFCC', '#CCCCFF', '#FFFFCC', '#FFCCFF', '#FFDDC1', '#C1FFC1', '#C1C6FF', '#FFECDA', '#D8BFD8'];

  const handleGenerateNames = () => {
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

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (raceInProgress) {
      interval = setInterval(() => {
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

          if (allFinished) {
            clearInterval(interval);
            setRaceInProgress(false);
          }

          return newProgress;
        });
      }, 1000);
      
    }

    return () => clearInterval(interval);
  }, [raceInProgress, playerNames, startTime]);

  return (
    <div className="App p-6 bg-cyan-100">
       
      <h1 className="text-3xl font-bold mb-4 text-center">Alcohol Race</h1>
      <div id="inputSection" className="mb-6 text-center">
        <label htmlFor="numPlayers" className="block text-lg mb-2">Enter number of players:</label>
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
          className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600"
        >
          Generate Player Names
        </button>
      </div>

      {playerNames.length > 0 && !raceInProgress && (
        <div id="namesSection" className="mb-6">
          {/* <h2 className="text-2xl mb-4">Enter Player Names:</h2> */}
          <div id="playerNamesContainer">
            {playerNames.map((name, index) => (
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
          <button
            id="startRace"
            onClick={handleStartRace}
            className="bg-green-500 text-white py-2 px-4 rounded mt-4 hover:bg-green-600"
          >
            Start Race
          </button>
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
    <div key={index} className="relative w-full my-2 border-2 border-black rounded" style={{ height: '50px' }}>
      <div
        className="absolute progress-bar text-center text-white font-bold leading-10 rounded"
        style={{
          width: `${progress[index]}%`,
          backgroundColor: colors[index % colors.length],
          height: '100%', // Ensure it takes up the full height of the parent
        }}
      >
        {`${playerNames[index] || `Player ${index + 1}`}: ${Math.round(progress[index])}%`}
      </div>
    </div>
  ))}
</div>

      )} 

      {!raceInProgress && finishTimes.length > 0 && (
        <div className="text-center">
          <h2 id="winner" className="text-2xl text-green-500 mb-4">Winner: {finishTimes[0]?.player}</h2>
          <table id="leaderboard" className="w-4/5 mx-auto border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">Rank</th>
                <th className="border px-4 py-2">Player</th>
                <th className="border px-4 py-2">Time (ms)</th>
              </tr>
            </thead>
            <tbody>
              {finishTimes.map((entry, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{entry?.player}</td>
                  <td className="border px-4 py-2">{entry?.time} ms</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
