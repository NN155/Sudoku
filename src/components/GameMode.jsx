import React from "react"
import Board from "./Board"

export default function GameMode(props) {
    function setMode(mode) {
        props.setGameMode(mode)
        let size = mode === "Default" ? 9 : 15
        props.setBoardData(props.initializeBoard(size, mode))

    }
    return (
        <>
        {
        props.gameMode === "With Letters" &&
        (
        <div>
            <button className="btn btn-warning" onClick={() => setMode("Default")}>Default</button>
        </div>
        )
        }
        {
        props.gameMode === "Default" &&
        (
        <div>
            <button className="btn btn-info" onClick={() => setMode("With Letters")}>With Letters</button>
        </div>
        )
        }
        </>
    )

}