import React, { useEffect, useState } from 'react'
import { getCell, upgradeCell } from '../helperFunctions'
import { Buildables } from '../data/Buildables'

const SideInfo = ({ selected, setSelected, gameData, setGameData }) => {
    const [resources, setResources] = useState(gameData.resources)

    useEffect(() => {
        setResources(gameData.resources)
    }, [gameData])

    switch (selected) {
        case "Game":
            return <GameSelected gameData={gameData} />
        case "Build":
            return <BuildSelected gameData={gameData} setGameData={setGameData} />
        case "Cell":
            return <CellSelected gameData={gameData} setGameData={setGameData} />
        default:
            break;
    }
}

const GameSelected = ({ gameData }) => {
    const gameInfo = { generals: gameData.generals, resources: gameData.resources }
    return (
        <div>
            <pre>{JSON.stringify(gameInfo, null, 2)}</pre>
        </div>
    )
}

const BuildSelected = ({ gameData, setGameData }) => {
    return (
        <div>
            {Buildables.map(e => {
                const objArr = Object.entries(e)
                const obj = objArr[0][1];
                return (
                    <div className='BuildablesList'>
                        <h5>{obj.name}</h5>
                        <h6>Produces</h6><ul>
                            {Object.entries(obj.produces).map(o => (
                                <li>+{o[1]} {o[0]}</li>
                            ))}
                        </ul>
                        <h6>Consumes</h6><ul>
                            {Object.entries(obj.consumes).map(o => (
                                <li>-{o[1]} {o[0]}</li>
                            ))}
                        </ul>
                    </div>
                )
            })}
        </div>
    )
}

const CellSelected = ({ gameData, setGameData }) => {
    const cell = getCell({ id: gameData.generals.selectedCell, gameData }) || { info: { actions: [] } }
    console.log({ cell })
    return (
        <div className='SideInfo'>
            <h4 className="CellText">{cell.location}: {cell.info.type}</h4>
            <div>
                {cell.info.actions.map(e => {
                    return (
                        <div className='ActionDiv' onClick={(event) => {
                            upgradeCell({ cell, gameData, setGameData, selectedUpgrade: e })
                        }}>
                            <span className='Margin-5px'>{e.icon(40)}</span>
                            <h5 className='ActionName'>{e.name}</h5>
                            <div className='ProducesDiv'>
                                <h6>Produces</h6>
                                {Object.entries(e.produces).map(([key, value]) => (
                                    <p>+{value} {key}</p>
                                ))}
                            </div>
                            <div className='ConsumesDiv'>
                                <h6>Consumes</h6>
                                {Object.entries(e.consumes).map(([key, value]) => (
                                    <p>-{value} {key}</p>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SideInfo