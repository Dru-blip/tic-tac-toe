import { useState } from "react"
import Cell from "./Cell"
import { checkForDraw, checkWinner, findOptimalMove } from "../utils";


interface Props {
    playerScore: number,
    botScore: number,
    setPlayerScore: React.Dispatch<React.SetStateAction<number>>
    setBotScore: React.Dispatch<React.SetStateAction<number>>
    turn: string,
    setTurn: React.Dispatch<React.SetStateAction<string>>
}

export default function Board(props: Props) {
    const [cells, setCells] = useState<string[]>(new Array(9).fill(''))
    const [winner, setWinner] = useState<string>('')
    const [isDraw, setIsDraw] = useState<boolean>(false)


    const renderDrawUI = () => {
        return <div className="flex items-center flex-col">
            <div className="flex items-center justify-around">
                <img src={"/X.svg"} width={120} alt="x" />
                <img src={"/O.svg"} width={120} alt="O" />
            </div>
            <p className="text-white text-4xl font-bold">Draw</p>
        </div>
    }

    const renderWinnerUI = (winner: string) => {
        return (
            <div className="flex items-center justify-around flex-col">
                {
                    winner === 'X' ?
                        <img src={"/X.svg"} width={120} alt="x" />
                        :
                        <img src={"/O.svg"} width={120} alt="O" />
                }
                <p className={'text-xl font-bold ' + (winner === 'X' ? 'text-green-500 ' : 'text-[#FA453B]')}>Winnner!</p>
            </div>
        )
    }

    const renderCells = () => {
        return <div className="grid grid-cols-3 h-[550px] w-[550px]">
            {
                cells ? cells.map((cell, index) => {
                    return <Cell id={index} key={index} value={cell} onClick={onClick} />
                }) : <></>
            }
        </div>
    }

    const onClick = (id: number) => {
        if (!cells[id]) {
            cells[id] = props.turn
            setCells([...cells])

            let isDraw = checkForDraw(cells)
            if (isDraw) {
                setIsDraw(isDraw)
            }
            let winner = checkWinner(cells)
            if (winner !== '') {
                if (winner === 'X') {
                    let score = props.playerScore + 1
                    setWinner('X')
                    props.setPlayerScore(score)
                } else {
                    setWinner('O')
                    let score = props.botScore + 1
                    props.setBotScore(score)
                }
            } else {
                props.setTurn('O')
                let move = findOptimalMove(cells)
                cells[move] = 'O'
                setCells([...cells])
                
                setTimeout(()=>{
                    props.setTurn('X')
                },250)

                let winner = checkWinner(cells)

                if (winner !== '') {
                    if (winner === 'X') {
                        let score = props.playerScore + 1
                        setWinner('X')
                        props.setPlayerScore(score)
                    } else {
                        setWinner('O')
                        let score = props.botScore + 1
                        props.setBotScore(score)
                    }

                }
            }
        }
    }
    return (
        <div className="text-white">
            {
                isDraw ? renderDrawUI() : (winner !== '' ? renderWinnerUI(winner) : renderCells())
            }
            <button onClick={() => {
                setCells(new Array(9).fill(''))
                setIsDraw(false)
                setWinner('')
            }} className="text-white font-bold mt-4 bg-[#20493e]  rounded-md w-full hover:cursor-pointer p-2 hover:bg-[#327462]">Restart Game</button>

        </div >

    )
}