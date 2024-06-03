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
    cellInformation: []
}

export const tileType = {
    grass: {
        type: "grass",
        actions: grassActions
    },
    rock: {
        type: "rock",
        actions: rockActions
    },
    forest: {
        type: "forest",
        actions: forestActions
    },
    river: {
        type: "river",
        actions: riverActions
    }
}