import React from "react"
import Solver from "./Solver"
export default function Board() {
    const boardSize = 9;
    const [boardData, setBoardData] = React.useState(() => initializeBoard(boardSize))
    const boardStyle = {
        gridTemplateColumns: `repeat(${boardSize}, 30px)`
    }
    function initializeBoard(size) {
        let data = []
        // Create an empty board
        for (let i = 0; i < size; i++) {
            data.push([])
          for (let j = 0; j < size; j++) {
            data[i].push({ value: [1,2,3,4,5,6,7,8,9], isRevealed: false, currentValue: 0, checked: false, isBlue: false});
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
        value = (value + 1) % 10
        setBoardData(prevBoard => {
            const cell = {
                ...prevBoard[i][j],
                isRevealed: value !== 0,
                currentValue: value}
            const newBoard = prevBoard.map(element => element)
            newBoard[i][j] = cell
            return newBoard
        })
    }
    
    function createCell(i, j) {
        let cellStyle = {}
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
        return (
            boardData[i][j].isBlue ? 
            (
            <div className="cell unselectable-text blue" style={cellStyle} onClick={() => revealCell(i, j)} onKeyDown={event => handleKeyPress(event, i, j)} tabIndex="0" key={`cell-${i}-${j}`}>
                <p>{boardData[i][j].isRevealed && boardData[i][j].currentValue}</p>
            </div>
            )
            :
            (
            <div className="cell unselectable-text" style={cellStyle} onClick={() => revealCell(i, j)} onKeyDown={event => handleKeyPress(event, i, j)} tabIndex="0" key={`cell-${i}-${j}`}>
                <p>{boardData[i][j].isRevealed && boardData[i][j].currentValue}</p>
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
    const cells = createBoard(boardSize)

    return (
        <>
        <div className="center">
            <div className="board" style={boardStyle}>
                {cells}
            </div>
        </div>
        <div className="center">
            <Solver boardData={boardData} setBoardData={setBoardData}/>
        </div>
        </>
    )
} 