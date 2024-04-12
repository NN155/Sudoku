import React from "react"

export default function GameMode(props) {
    function setMode(mode) {
        props.setGameMode(mode)
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