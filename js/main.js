const target = 'pie is a lie';

let population = [];
let totalPopulation = 200;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomChar() {
    let c = getRandomInt(32, 126);
    return String.fromCharCode(c);
}

class Genotype {
    constructor(targetLen) {
        this.genes = []; // To store phrase
        for (let i = 0; i < targetLen; i++) {
            this.genes[i] = getRandomChar();
        }
    }
}

for (let i = 0; i < totalPopulation; i++) {
    population[i] = new Genotype(target.length);
}
