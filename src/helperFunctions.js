import ReactDOMServer from 'react-dom/server';
import { GameData, tileType } from "./data/GameData";


export const alphabet = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

export const populateCells = async ({ gameData, setGameData }) => {
    const types = { rock: [], river: [], forest: [] };
    var cells = chunkArray(getAllMapCells(), 40);

    cells = cells.map(row => (
        row.map(e => {
            const randomDirection = Math.floor(Math.random() * 4) + 1;
            const randomType = Math.floor(Math.random() * 50) + 1;
            let type = tileType.grass; // Default type

            // Handle existing types
            if (types.rock.includes(e.id)) {
                const rd = randomiseDirection({ cellId: e.id, randomDirection, type: types.rock });
                types.rock.push(rd);
                return { cell: e, location: e.id, info: tileType.rock };
            }
            if (types.river.includes(e.id)) {
                const rd = randomiseDirection({ cellId: e.id, randomDirection, type: types.river });
                types.river.push(rd);
                return { cell: e, location: e.id, info: tileType.river };
            }
            if (types.forest.includes(e.id)) {
                const rd = randomiseDirection({ cellId: e.id, randomDirection, type: types.forest });
                types.forest.push(rd);
                return { cell: e, location: e.id, info: tileType.forest };
            }

            // Handle new types based on randomType
            switch (randomType) {
                case 1:
                    types.rock.push(e.id);
                    type = tileType.rock;
                    const rockRd = randomiseDirection({ cellId: e.id, randomDirection, type: types.rock });
                    types.rock.push(rockRd);
                    break;
                case 2:
                    types.river.push(e.id);
                    type = tileType.river;
                    const riverRd = randomiseDirection({ cellId: e.id, randomDirection, type: types.river });
                    types.river.push(riverRd);
                    break;
                case 3:
                    types.forest.push(e.id);
                    type = tileType.forest;
                    const forestRd = randomiseDirection({ cellId: e.id, randomDirection, type: types.forest });
                    types.forest.push(forestRd);
                    break;
                default:
                    break;
            }

            return { cell: e, location: e.id, info: type };
        })
    ));

    console.log("Final cells data:", cells);
    setGameData({ ...gameData, cellInformation: cells });
};


export const fillInCells = async ({ gameData }) => {
    gameData.cellInformation.forEach(row => {
        row.forEach(e => {
            setBackground({ cell: e.cell, type: e.info.type })
        })
    })
}

export const getCell = ({ id, gameData }) => {
    var cell;
    gameData.cellInformation.forEach(row => {
        row.forEach(e => {
            if (e.cell.id === id) {
                cell = e
            }
        })
    })
    return cell;
}

export const upgradeCell = ({ cell, gameData, setGameData, selectedUpgrade }) => {
    console.log({ cell, gameData, setGameData, selectedUpgrade })

    //selectedUpgrade.produces => {food: 5, population2} can have food, population, stone, wood, money
    cell.info.applied.push(selectedUpgrade)

    // Create a copy of the produces object
    let newProduces = { ...gameData.produces };

    // Iterate over the keys in selectedUpgrade.produces and update newProduces
    Object.keys(selectedUpgrade.produces).forEach((key) => {
        newProduces[key] = (newProduces[key] || 0) + selectedUpgrade.produces[key];
    });

    setGameData({
        ...gameData,
        cellInformation: gameData.cellInformation.map(e => {
            e.map(i => {
                if (i.location === cell.location) {
                    i = cell;
                    const svgString = ReactDOMServer.renderToString(selectedUpgrade.icon(10));
                    i.cell.innerHTML = svgString;
                }
                return i
            })
            return e
        }),
        produces: newProduces
    })
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
    var cellIdArr = cellId.split("-")

    switch (randomDirection) {
        case 1: //up
            cellIdArr[0] = alphabet[alphabet.indexOf(cellIdArr[0]) + 1] || 0;
            if (type.includes(cellIdArr.join("-"))) return randomiseDirection({ cellId, randomDirection: Math.floor(Math.random() * 3) + 2, type })
            break;
        case 2: //down
            var numbers = [1, 3, 4];
            cellIdArr[0] = alphabet[alphabet.indexOf(cellIdArr[0]) - 1] || 0;
            if (type.includes(cellIdArr.join("-"))) return randomiseDirection({ cellId, randomDirection: numbers[Math.floor(Math.random() * numbers.length)], type })
            break;
        case 3: //right
            var numbers = [1, 2, 4];
            cellIdArr[1] = parseInt(cellIdArr[1]) + 1
            if (type.includes(cellIdArr.join("-"))) return randomiseDirection({ cellId, randomDirection: numbers[Math.floor(Math.random() * numbers.length)], type })
            break;
        case 4: //left
            cellIdArr[1] = parseInt(cellIdArr[1]) - 1
            if (type.includes(cellIdArr.join("-"))) return randomiseDirection({ cellId, randomDirection: Math.floor(Math.random() * 3) + 1, type })
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