import React, { useState } from 'react';
import '../css/Tabs.css';

const Tabs = ({ selected, setSelected }) => {
    return (
        <div className='Flex-Row TabsDiv'>
            <h5 className={`Tab ${selected === "Cell" ? 'SelectedTab' : 'UnselectedTab'}`} onClick={(e) => {
                setSelected("Cell")
            }}>Cell</h5>
            <h5 className={`Tab ${selected === "Build" ? 'SelectedTab' : 'UnselectedTab'}`} onClick={(e) => {
                setSelected("Build")
            }}>Build</h5>
            <h5 className={`Tab ${selected === "Game" ? 'SelectedTab' : 'UnselectedTab'}`} onClick={(e) => {
                setSelected("Game")
            }}>Game</h5>
        </div>
    )
}

export default Tabs