export const Buildables = [{
    stronghold: {
        name: "stronghold",
        produces: {
            population: 10,
            food: 10
        },
        consumes: {},
        health: 100,
        effects: ["HOME"],
        multiple: false,
        placed: 0
    }
}, {
    stoneWall: {
        name: "stone wall",
        produces: {},
        consumes: {
            stone: 3
        },
        health: 30,
        effects: ["BLOCK"],
        multiple: true,
        placed: 0
    }
}, {
    woodWall: {
        name: "wooden wall",
        produces: {},
        consumes: {
            wood: 3
        },
        health: 15,
        effects: ["BLOCK"],
        multiple: true,
        placed: 0
    }
}]