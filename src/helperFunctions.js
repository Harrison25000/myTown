import { GameData, tileType } from "./data/GameData"

export const alphabet = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

export const populateCells = async ({ gameData, setGameData }) => {
    const types = { rock: [], river: [], forest: [] }
    var cells = chunkArray(getAllMapCells(), 40);

    cells = cells.map(x => (
        x.map(e => {
            const randomDirection = Math.floor(Math.random() * 4) + 1;
            const randomType = Math.floor(Math.random() * 50) + 1;
            var type = tileType.grass;

            if (types.rock.includes(e.id)) {
                console.log("rock includes")
                var rd = randomiseDirection({ cellId: e.id, randomDirection, type: types.rock })
                types.rock.push(rd)
                return { cell: e, info: tileType.rock }
            }
            if (types.river.includes(e.id)) {
                console.log("river includes")
                var rd = randomiseDirection({ cellId: e.id, randomDirection, type: types.river })
                types.river.push(rd)
                return { cell: e, info: tileType.river }
            }
            if (types.forest.includes(e.id)) {
                console.log("forest includes")
                var rd = randomiseDirection({ cellId: e.id, randomDirection, type: types.forest })
                types.forest.push(rd)
                return { cell: e, info: tileType.forest }
            }

            switch (randomType) {
                case 1:
                    types.rock.push(e.id)
                    type = tileType.rock
                    var rd = randomiseDirection({ cellId: e.id, randomDirection, type: types.rock })
                    types.rock.push(rd)
                    break;
                case 2:
                    types.river.push(e.id)
                    type = tileType.river
                    var rd = randomiseDirection({ cellId: e.id, randomDirection, type: types.river })
                    types.river.push(rd)
                    break;
                case 3:
                    types.forest.push(e.id)
                    type = tileType.forest
                    var rd = randomiseDirection({ cellId: e.id, randomDirection, type: types.forest })
                    types.forest.push(rd)
                    break;
                default:
                    break;
            }

            return { cell: e, info: type }
        })
    ))
    console.log({ types })
    setGameData({ ...GameData, cellInformation: cells })
}

export const fillInCells = async ({ gameData }) => {
    console.log({ gameData })
    gameData.cellInformation.forEach(row => {
        row.forEach(e => {
            setBackground({ cell: e.cell, type: e.info.type })
        })
    })
}

const getCell = ({ id, gameData }) => {
    return gameData.cellInformation.map(row => row.filter(e => (
        e.id === id
    )))
}

const setBackground = ({ cell, type }) => {
    switch (type) {
        case "river":
            cell.style.background = "aqua";
            break;
        case "forest":
            cell.style.background = "darkgreen";
            break;
        case "rock":
            cell.style.background = "grey";
            break;
        default:
            break;
    }
}

const randomiseDirection = ({ cellId, randomDirection, type }) => {
    console.log({ cellId, randomDirection, type })
    var cellIdArr = cellId.split("-")

    switch (randomDirection) {
        case 1: //up
            cellIdArr[0] = alphabet[alphabet.indexOf(cellIdArr[0]) + 1] || 0;
            if (type.includes(cellIdArr.join("-"))) return randomiseDirection({ cellId, randomDirection: 2, type })
            break;
        case 2: //down
            cellIdArr[0] = alphabet[alphabet.indexOf(cellIdArr[0]) - 1] || 0;
            if (type.includes(cellIdArr.join("-"))) return randomiseDirection({ cellId, randomDirection: 1, type })
            break;
        case 3: //right
            cellIdArr[1] = parseInt(cellIdArr[1]) + 1
            if (type.includes(cellIdArr.join("-"))) return randomiseDirection({ cellId, randomDirection: 4, type })
            break;
        case 4: //left
            cellIdArr[1] = parseInt(cellIdArr[1]) - 1
            if (type.includes(cellIdArr.join("-"))) return randomiseDirection({ cellId, randomDirection: 3, type })
            break;
        default:
            break;
    }
    return cellIdArr.join("-")
}

function chunkArray(array, chunkSize) {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize));
    }
    return result;
}

function getAllMapCells() {
    // Get the table element by its ID
    const table = document.getElementById("gameTable");

    // Check if the table exists
    if (!table) {
        console.error(`Table with ID gameTable not found.`);
        return [];
    }

    // Use querySelectorAll to get all <td> elements within the table
    const cells = table.querySelectorAll('td');

    // Convert NodeList to an array for easier manipulation (optional)
    return Array.from(cells).filter(e => !e.classList.contains("OutsideMap"));
}