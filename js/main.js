const target = 'pie is a lie';

let population = [];
let totalPopulation = 200;
let matingPool = [];

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
        this.fitness = 0; // To see how well it matches target
        for (let i = 0; i < targetLen; i++) {
            this.genes[i] = getRandomChar();
        }
    }

    calculateFitness(target) {
        let score = 0;
        for (let i = 0; i < this.genes.length; i++) {
            if (this.genes[i] === target.charAt(i)) {
                score++;
            }
        }
        this.fitness = score / target.length;
    }

    crossGenome(partner) {
        let child = new Genotype(this.genes.length);

        let split = getRandomInt(this.genes.length * 0.25, this.genes.length * 0.75);
        for (let i = 0; i < this.genes.length; i++) {
            if (i < split) {
                child.genes[i] = this.genes[i];
            } else {
                child.genes[i] = partner.genes[i];
            }
        }
        return child;
    }

}

for (let i = 0; i < totalPopulation; i++) {
    population[i] = new Genotype(target.length);
    population[i].calculateFitness(target);
    let child = population[i].crossGenome(population[0]);
}

for (let i = 0; i < population.length; i++) {
    let n = Math.floor(population[i].fitness * 100); // turn fitness (%) into quantity factor
    // better fitness means more genes in the mating pool
    for (let j = 0; j < n; j++) {
        matingPool.push(population[i]);
    }
}

for (let i = 0; i < population.length; i++) {
    let a = getRandomInt(0, matingPool.length - 1);
    let b = getRandomInt(0, matingPool.length - 1);
    let memberA = matingPool[a];
    let memberB = matingPool[b];
    let child = memberA.crossGenome(memberB);
    child.calculateFitness(target);
    population[i] = child;
}
