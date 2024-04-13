import React from "react"
import {stringValues} from "../data" 

export default function Solver(props) {
    let newBoard;
    const boardSizeInBox = props.gameMode === "Default" ? 3 : 4
    function newCell(oldCell, valueToRemove) {
        let newValue = oldCell.value.filter(element => element !== valueToRemove)
        const cell = {
            ...oldCell,
            value: newValue,
        }
        return cell
    }

    function removeRow(i, j) {
        for (let x = 0; x < props.boardSize; x++) {
            if (!newBoard[i][x].isRevealed) {
                newBoard[i][x] = newCell(newBoard[i][x], newBoard[i][j].currentValue)
            }
        }
    }

    function removeColumn(i, j) {
        for (let y = 0; y < props.boardSize; y++) {
            if (!newBoard[y][j].isRevealed) {
                newBoard[y][j] = newCell(newBoard[y][j], newBoard[i][j].currentValue)
            }
        }
    }

    function removeBox(i, j) {
        let iBox = (Math.floor(i / boardSizeInBox)) * boardSizeInBox
        let jBox = (Math.floor(j / boardSizeInBox)) * boardSizeInBox
        for (let y =  iBox; y < iBox + boardSizeInBox; y++) {
            for (let x = jBox; x < jBox + boardSizeInBox; x++) {
                if (!newBoard[y][x].isRevealed) {
                    newBoard[y][x] = newCell(newBoard[y][x], newBoard[i][j].currentValue)
                }
            }
        }
    }

    function removeValues(i, j) {
        removeRow(i, j) 
        removeColumn(i, j)
        removeBox(i, j)
    } 

    function checkAllCells() {
        for (let i = 0; i < props.boardSize; i++) {
            for (let j = 0; j < props.boardSize; j++) {
                if (newBoard[i][j].isRevealed && !newBoard[i][j].checked) {
                    removeValues(i, j)
                    newBoard[i][j] = { 
                        ...newBoard[i][j],
                        checked: true
                    }
                }
            }
        }
    }
    function difference(cells) {
        let result = props.gameMode === "Default" ? 
        {"1": [], "2": [], "3": [], "4": [], "5": [], "6": [], "7": [], "8": [], "9": []}
        :
        {"1": [], "2": [], "3": [], "4": [], "5": [], "6": [], "7": [], "8": [], "9": [], "10": [], "A": [], "B": [], "C": [], "D": [], "E": [], "F": []}
        // [i,j , cell]
        for (let cell of cells) {
            for (let i of cell[2].value) {
                result[i].push([cell[0], cell[1]]) // [i, j]
            }
        }
        checkCells(result)
    }
    function checkCells(result) {
        for (let key in result) {
            if (result[key].length === 1) {
                const [i, j] = result[key][0]
                const cell = {
                    ...newBoard[i][j],
                    value: [stringValues[key]]
                }
                newBoard[i][j] = cell
            }
        }
    }
    function checkRows() {
        for (let i = 0; i < props.boardSize; i++) {
            let row = []
            for (let j = 0; j < props.boardSize; j++) {
                if (!newBoard[i][j].isRevealed) {
                    row.push([i, j, newBoard[i][j]])
                }
            }
            if (row.length !== 0) {
                difference(row)
            }
        }
    }

    function checkColumn() {
        for (let j = 0; j < props.boardSize; j++) {
            let column = []
            for (let i = 0; i < props.boardSize; i++) {
                if (!newBoard[i][j].isRevealed) {
                    column.push([i, j, newBoard[i][j]])
                }
            }
            if (column.length !== 0) {
                difference(column)
            }
        }
    }

    function checkBox() {
        for (let y = 0; y < boardSizeInBox; y++) {
            for (let x = 0; x < boardSizeInBox; x++) {
                let box = []
                for (let i = y * boardSizeInBox; i < (y * boardSizeInBox) + boardSizeInBox; i++) {
                    for (let j = x * boardSizeInBox; j < (x * boardSizeInBox) + boardSizeInBox; j++) {
                        if (!newBoard[i][j].isRevealed) {
                            box.push([i, j, newBoard[i][j]])
                        }
                    }
                }

                if (box.length !== 0) {
                    difference(box)
                }         
            }
        }
    }

    function checkAnotherCells() {
        checkRows()
        checkColumn()
        checkBox()
    }
    function displayCells() {
        for (let i = 0; i < props.boardSize; i++) {
            for (let j = 0; j < props.boardSize; j++) {
                if (newBoard[i][j].value.length === 1) {
                    newBoard[i][j] = { 
                        ...newBoard[i][j],
                        isRevealed: true,
                        currentValue: newBoard[i][j].value[0],
                        isBlue: true
                    }
                }
            }
        }
    }
    
    function solve() {
        newBoard = props.boardData.map(element => element)
        checkAllCells()
        checkAnotherCells()
        displayCells()
        props.setBoardData(newBoard)
    }

    return (
        <div>
            <button className="btn btn-success" onClick={solve}>Solve</button>
        </div>
    )
}