import { useState } from 'react'
import Board from './components/Board'


function App() {
  const [playerScore, setPlayerScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  const [turn, setTurn] = useState('X');

  return (
    <div className='min-h-screen flex items-center justify-center flex-col'>
      <div className="flex  items-center justify-around text-white w-full">
        <div className="border-4 rounded-xl w-[200px] border-green-500 p-5 flex flex-col ">
          <img src={"/X.svg"} width={30} alt="x" />
          <div className='flex items-center justify-between'>
            <p className="font-bold text-xl">You :</p>
            <p className="text-center text-2xl font-bold">{playerScore}</p>
          </div>
        </div>
        <div className='flex items-center'>
          <p className='text-2xl font-bold mr-5'>Turn : </p>
          {turn === 'X' ? <img src={"/X.svg"} width={50} alt="x" /> : <img src={"/O.svg"} width={50} alt="O" />}
        </div>
        <div className="border-4 rounded-xl w-[200px] border-[#FA453B] p-5 flex flex-col ">
        <img src={"/O.svg"} width={30} alt="O" />
          <div className='flex items-center justify-between'>
            <p className="font-bold text-xl ">Bot :</p>
            <p className="text-center text-2xl font-bold">{botScore}</p>
          </div>
        </div>
      </div>
      <Board playerScore={playerScore} botScore={botScore} setPlayerScore={setPlayerScore} setBotScore={setBotScore} turn={turn} setTurn={setTurn} />
    </div>
  )
}

export default App
