import React from "react"
import Solver from "./Solver"
import Restart from "./Restart"
import GameMode from "./GameMode"

export default function Board() {
    const values = {
        "0": 0,
        "1": 1,
        "2": 2,
        "3": 3,
        "4": 4,
        "5": 5,
        "6": 6,
        "7": 7,
        "8": 8,
        "9": 9,
        "10": 10,
        "11": "A",
        "12": "B",
        "13": "C",
        "14": "D",
        "15": "F"
    }
    const reversValue = {
        "0": 0,
        "1": 1,
        "2": 2,
        "3": 3,
        "4": 4,
        "5": 5,
        "6": 6,
        "7": 7,
        "8": 8,
        "9": 9,
        "10": 10,
        "A": 11,
        "B": 12,
        "C": 13,
        "D": 14,
        "F": 15
    }
    
    const [gameMode, setGameMode] = React.useState("Default")
    const boardSize = gameMode === "Default" ? 9 : 15
    const [boardData, setBoardData] = React.useState(initializeBoard(boardSize))
    const boardStyle = {
        gridTemplateColumns: `repeat(${boardSize}, 30px)`
    }
    function initializeBoard(size, mode = gameMode) {
        let data = []
        // Create an empty board
        for (let i = 0; i < size; i++) {
            data.push([])
          for (let j = 0; j < size; j++) {
            const cell = {isRevealed: false, currentValue: 0, checked: false, isBlue: false}
            cell.value = mode === "Default" ? [1,2,3,4,5,6,7,8,9] : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
            data[i].push(cell)
          }
        }
        return data;
    }

    function handleKeyPress(event, i ,j ) {
        if (!isNaN(event.key)) {
            setBoardData(prevBoard => {
                const cell = {
                    ...prevBoard[i][j],
                    isRevealed: Number(event.key) !== 0,
                    currentValue: Number(event.key)}
                const newBoard = prevBoard.map(element => element)
                newBoard[i][j] = cell
                return newBoard
            })
        }
        else if (event.key === "Backspace"){
            setBoardData(prevBoard => {
                const cell = {
                    ...prevBoard[i][j],
                    isRevealed: 0 !== 0,
                    currentValue: 0 }
                const newBoard = prevBoard.map(element => element)
                newBoard[i][j] = cell
                return newBoard
            })
        }
    }
    function revealCell(i,j) {
        let value = boardData[i][j].currentValue

        if (gameMode === "Default") {
            value = (value + 1) % 10
        }
        else if (gameMode === "With Letters") {
            value = reversValue[value]
            value = (value + 1) % 16
            value = values[value]
        }
        setBoardData(prevBoard => {
            const cell = {
                ...prevBoard[i][j],
                isRevealed: value !== 0,
                currentValue: value
            }
            const newBoard = prevBoard.map(element => element)
            newBoard[i][j] = cell
            return newBoard
        })
    }
    
    function createCell(i, j) {
        let cellStyle = {}
        if (gameMode === "Default") {
            if (i % 3 === 0) {
                cellStyle.borderTop ="1px solid black"
            }
            else if ((i + 1) % 3 === 0 ) {
                cellStyle.borderBottom ="1px solid black"
            }
            if (j % 3 === 0) {
                cellStyle.borderLeft ="1px solid black"
            }
            else if ((j + 1) % 3 === 0) {
                cellStyle.borderRight ="1px solid black"
            }
        }
        else if (gameMode === "With Letters") {
            if (i % 5 === 0) {
                cellStyle.borderTop ="1px solid black"
            }
            else if ((i + 1) % 5 === 0 ) {
                cellStyle.borderBottom ="1px solid black"
            }
            if (j % 5 === 0) {
                cellStyle.borderLeft ="1px solid black"
            }
            else if ((j + 1) % 5 === 0) {
                cellStyle.borderRight ="1px solid black"
            }
        }
        return (
            boardData[i][j].isBlue ? 
            (
            <div className="cell unselectable-text blue" style={cellStyle} onClick={() => revealCell(i, j)} onKeyDown={event => handleKeyPress(event, i, j)} tabIndex="0" key={`cell-${i}-${j}`}>
                <p>{boardData[i][j].isRevealed && (boardData[i][j].currentValue === 10 ? 0 : boardData[i][j].currentValue)}</p>
            </div>
            )
            :
            (
            <div className="cell unselectable-text" style={cellStyle} onClick={() => revealCell(i, j)} onKeyDown={event => handleKeyPress(event, i, j)} tabIndex="0" key={`cell-${i}-${j}`}>
                <p>{boardData[i][j].isRevealed && (boardData[i][j].currentValue === 10 ? 0 : boardData[i][j].currentValue)}</p>
            </div>
            )
        )
    }
    function createBoard(size) {
        let cells = []
        for (let i = 0; i < size; i++) {
          for (let j = 0; j < size; j++) {
            let cell = createCell(i, j)
            cells.push(cell)
          }
        }
        return cells
    }




    return (
        <>
        <div className="center">
            <div className="board" style={boardStyle}>
                {createBoard(boardSize)}
            </div>
        </div>
        <div className="center">
            <Solver boardData={boardData} setBoardData={setBoardData} gameMode={gameMode}/>
        </div>
        <div className="center">
            <Restart setBoardData={setBoardData} initializeBoard={initializeBoard} size={boardSize} />
        </div>
        <div className="center">
            <GameMode gameMode={gameMode} setGameMode={setGameMode} setBoardData={setBoardData} initializeBoard={initializeBoard} boardData={boardData}/>
        </div>
        </>
    )
} 