export const grassActions = {
    allotment: {
        produces: {
            food: 2
        },
        consumes: {
            population: 1
        }
    },
    farm: {
        produces: {
            food: 5
        },
        consumes: {
            population: 2,
            wood: 5
        }
    }
}

export const rockActions = {
    miner: {
        produces: {
            stone: 2
        },
        consumes: {
            population: 1
        }
    },
    quary: {
        produces: {
            stone: 5
        },
        consumes: {
            population: 2,
            wood: 5,
            stone: 2
        }
    }
}

export const forestActions = {
    lumberJack: {
        produces: {
            wood: 2
        },
        consumes: {
            population: 1
        }
    },
    lumberMill: {
        produces: {
            wood: 5
        },
        consumes: {
            population: 2,
            wood: 5
        }
    }
}

export const riverActions = {
    waterMill: {
        produces: {
            food: 5
        },
        consumes: {
            population: 2,
            wood: 5,
            stone: 2
        }
    }
}