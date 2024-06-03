import { useEffect, useState } from "react";
import React from 'react'
import { alphabet, fillInCells, populateCells } from "../helperFunctions";

const GameMap = ({ gameData, setGameData }) => {
    useEffect(async () => {
        createTable();
        await populateCells({ gameData, setGameData });
    }, [])

    const createTable = () => {
        const gameTableElement = document.getElementById("gameTable")

        // First Row of the table - looks like "(empty) | 0 | 1 | 2 | 3 ..."
        const firstRow = document.createElement('tr');
        const firstRowCell = document.createElement('td')
        firstRowCell.className = "OutsideMap";
        firstRowCell.id = "emptyFirstCell";

        firstRow.appendChild(firstRowCell);

        for (let i = 1; i < 41; i++) {
            const tableRowCell = document.createElement('td')
            tableRowCell.id = i;
            tableRowCell.innerHTML = i
            tableRowCell.className = "OutsideMap";
            firstRow.appendChild(tableRowCell)
        }

        // each subsequent row being added to the table A - Z
        gameTableElement.appendChild(firstRow);

        for (let index = 0; index < 26; index++) {
            const tableRow = document.createElement('tr')

            // First Cell showing X position (A, B, C ...)
            const firstTableRowCell = document.createElement('td')
            firstTableRowCell.id = `${alphabet[index]}-0`;
            firstTableRowCell.className = "OutsideMap";
            firstTableRowCell.innerHTML = `${alphabet[index]}`
            tableRow.appendChild(firstTableRowCell)

            for (let i = 1; i < 41; i++) {
                const tableRowCell = document.createElement('td')
                tableRowCell.id = `${alphabet[index]}-${i}`
                tableRow.appendChild(tableRowCell)
            }

            gameTableElement.appendChild(tableRow)
        }

    }


    return (
        <table id="gameTable">
        </table>
    )
}

export default GameMap