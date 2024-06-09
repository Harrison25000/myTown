import { forestActions, grassActions, riverActions, rockActions } from "./TileTypes"

export const GameData =
{
    generals: {
        turn: 0,
        status: "not started",
        gameName: "",
    },
    resources: {
        population: 0,
        food: 0,
        money: 0,
        stone: 0,
        wood: 0,
    },
    cellInformation: [],
    produces: { food: 0, population: 0, stone: 0, water: 0, money: 0 }
}

export const tileType = {
    grass: {
        type: "grass",
        actions: grassActions,
        applied: []
    },
    rock: {
        type: "rock",
        actions: rockActions,
        applied: []
    },
    forest: {
        type: "forest",
        actions: forestActions,
        applied: []
    },
    river: {
        type: "river",
        actions: riverActions,
        applied: []
    }
}