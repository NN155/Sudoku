import React from "react"

export default function Restart(props) {
    function restart() {
        props.setBoardData(props.initializeBoard(props.size))
    }
    return (
        <div>
            <button className="btn btn-danger" onClick={restart}>Restart</button>
        </div>
    )

}