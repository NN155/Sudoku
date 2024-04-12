import React from "react"

export default function Solver(props) {
    let newBoard;

    function newCell(oldCell, valueToRemove) {
        let newValue = oldCell.value.filter(element => element !== valueToRemove)
        const cell = {
            ...oldCell,
            value: newValue,
        }
        return cell
    }

    function removeRow(i, j) {
        for (let x = 0; x < 9; x++) {
            if (!newBoard[i][x].isRevealed) {
                newBoard[i][x] = newCell(newBoard[i][x], newBoard[i][j].currentValue)
            }
        }
    }

    function removeColumn(i, j) {
        for (let y = 0; y < 9; y++) {
            if (!newBoard[y][j].isRevealed) {
                newBoard[y][j] = newCell(newBoard[y][j], newBoard[i][j].currentValue)
            }
        }
    }

    function removeBox(i, j) {
        let iBox = (Math.floor(i / 3)) * 3
        let jBox = (Math.floor(j / 3)) * 3
        for (let y =  iBox; y < iBox + 3; y++) {
            for (let x = jBox; x < jBox + 3; x++) {
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
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
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
        let result = {"1": [], "2": [], "3": [], "4": [], "5": [], "6": [], "7": [], "8": [], "9": []}
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
                    value: [Number(key)]
                }
                newBoard[i][j] = cell
            }
        }
    }
    function checkRows() {
        for (let i = 0; i < 9; i++) {
            let row = []
            for (let j = 0; j < 9; j++) {
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
        for (let j = 0; j < 9; j++) {
            let column = []
            for (let i = 0; i < 9; i++) {
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
        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 3; x++) {
                let box = []
                for (let i = y * 3; i < (y * 3) + 3; i++) {
                    for (let j = x * 3; j < (x * 3) + 3; j++) {
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
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
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