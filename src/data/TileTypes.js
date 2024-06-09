import { BarnSvg, GardenSvg, LumberJackSvg, MinerSvg, QuarrySvg, SawMillSvg, WaterMillSvg } from "../images/AllSvgs"

export const grassActions = [
    {
        name: "garden",
        level: 1,
        produces: {
            food: 2
        },
        consumes: {
            population: 1
        },
        icon: (size) => GardenSvg(size)
    },
    {
        name: "farm",
        level: 2,
        produces: {
            food: 5
        },
        consumes: {
            population: 2,
            wood: 5
        },
        icon: (size) => BarnSvg(size)
    }
]

export const rockActions = [
    {
        name: "miner",
        level: 1,
        produces: {
            stone: 2
        },
        consumes: {
            population: 1
        },
        icon: (size) => MinerSvg(size)
    },
    {
        name: "quarry",
        level: 2,
        produces: {
            stone: 5
        },
        consumes: {
            population: 2,
            wood: 5,
            stone: 2
        },
        icon: (size) => QuarrySvg(size)
    }
]

export const forestActions = [
    {
        name: "lumberJack",
        level: 1,
        produces: {
            wood: 2
        },
        consumes: {
            population: 1
        },
        icon: (size) => LumberJackSvg(size)
    },
    {
        name: "sawMill",
        level: 2,
        produces: {
            wood: 5
        },
        consumes: {
            population: 2,
            wood: 5
        },
        icon: (size) => SawMillSvg(size)
    }
]

export const riverActions = [
    {
        name: "waterMill",
        level: 1,
        produces: {
            food: 5
        },
        consumes: {
            population: 2,
            wood: 5,
            stone: 2
        },
        icon: (size) => WaterMillSvg(size)
    }
]