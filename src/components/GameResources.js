import React from 'react'
import '../css/GameResources.css';

const GameResources = ({ gameData, setGameData }) => {
    return (
        <div className="GameResources">
            {Object.entries(gameData.resources).map(e => {
                return (<p>{`${e[0]}: ${e[1]}`}</p>)
            })}
        </div>
    )
}

export default GameResources