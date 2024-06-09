import React, { useEffect, useState } from 'react';
import ForestCell from '../images/ForestCell.png';
import GrassCell from '../images/GrassCell.png';
import RiverCell from '../images/RiverCell.png';
import RockCell from '../images/RockCell.png';
import '../css/SelectedCellImage.css';
import { getCell } from '../helperFunctions';

const SelectedCellImage = ({ selected, setSelected, gameData, setGameData }) => {
    console.log({ selected, setSelected, gameData, setGameData });

    const [image, setImage] = useState(GrassCell);

    useEffect(() => {
        const cell = getCell({ id: gameData.generals.selectedCell, gameData });
        console.log({ selected, cell })
        if (cell) {
            switch (cell.info.type) {
                case 'grass':
                    setImage(GrassCell)
                    break;
                case 'forest':
                    setImage(ForestCell)
                    break;
                case 'river':
                    setImage(RiverCell)
                    break;
                case 'rock':
                    setImage(RockCell)
                    break;

                default:
                    break;
            }
        }
    }, [gameData, selected])

    return (
        <div className='CellImageDiv'>
            <img className='CellImage' src={image} alt='Selected Cell' />
        </div>
    );
};

export default SelectedCellImage;
