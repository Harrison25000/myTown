import React, { useState, useEffect } from 'react'
import '../css/SidePanel.css'
import Tabs from './Tabs'
import SideInfo from './SideInfo';
import GameResources from './GameResources';
import EndTurn from './EndTurn';
import SelectedCellImage from './SelectedCellImage';

const SidePanel = ({ gameData, setGameData }) => {
    const [selected, setSelected] = useState("Cell");

    useEffect(() => {
        console.log({ gameData })
    }, [gameData])


    return (
        <div className='SidePanelContainer'>
            <div className='SidePanel'>
                <Tabs selected={selected} setSelected={setSelected} gameData={gameData} setGameData={setGameData} />
                {selected === "Cell" && <SelectedCellImage selected={selected} setSelected={setSelected} gameData={gameData} setGameData={setGameData} />}
                <GameResources gameData={gameData} setGameData={setGameData} />
                <SideInfo selected={selected} setSelected={setSelected} gameData={gameData} setGameData={setGameData} />
            </div>
            <EndTurn gameData={gameData} setGameData={setGameData} />
        </div>

    )
}

export default SidePanel