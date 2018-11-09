const target = 'Pie is a lie!';

const display = document.querySelector('#display');

let population = [];
let totalPopulation = 150;
let mutationRate = 0.01
let matingPool = [];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomChar() {
    let c = getRandomInt(32, 126);
    return String.fromCharCode(c);
}

for (let i = 0; i < totalPopulation; i++) {
    population[i] = new Genotype(target.length);
    population[i].calculateFitness(target);
}

let run = true;
let iterations = 0;

while (run) {

    iterations++;

    matingPool = []; // Clear mating pool
    
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
        child.mutate(mutationRate);
        child.calculateFitness(target);
        console.log(child.genes.toString() + ' ' + child.fitness);
        if (child.fitness == 1) {
            display.innerHTML = child.genes.toString();
            console.log('Found (' + iterations + '): ' + child.genes.toString());
            run = false;
            break;
        }
        population[i] = child;
    }

}
