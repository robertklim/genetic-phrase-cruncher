const target = 'Pie is a lie!';

let population = [];
let matingPool = [];

let totalPopulation = 200;
let mutationRate = 0.01
let iterations = 0;

let display = '';
let displayText = '';
let bestFitness = 0;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomChar() {
    let c = getRandomInt(32, 126);
    return String.fromCharCode(c);
}

function setup() {
    display = createP('');
    display.position(20, 20);

    // generate population with random genotype
    for (let i = 0; i < totalPopulation; i++) {
        population[i] = new Genotype(target.length);
        population[i].calculateFitness(target);
    }
}

function draw() {

    iterations++;

    matingPool = []; // clear mating pool

    for (let i = 0; i < population.length; i++) {
        let n = Math.floor(population[i].fitness * 100); // turn fitness (%) into quantity factor
        // better fitness means more genes in the mating pool
        for (let j = 0; j < n; j++) {
            matingPool.push(population[i]);
        }
    }

    // choose two population members and cross their genes
    for (let i = 0; i < population.length; i++) {
        let a = getRandomInt(0, matingPool.length - 1);
        let b = getRandomInt(0, matingPool.length - 1);
        let memberA = matingPool[a];
        let memberB = matingPool[b];
        let child = memberA.crossGenome(memberB);
        // apply mutation
        child.mutate(mutationRate);
        // calculate fitness
        child.calculateFitness(target);
        if (child.fitness >= bestFitness) {
            bestFitness = child.fitness;
            displayText = 'iteration: ' + iterations + '<br>';
            displayText += 'Best match: ' + child.genes.toString() + ' (fitness: ' + bestFitness + ')';
        }
        // target found
        if (child.fitness == 1) {
            noLoop();
        }
        population[i] = child;
    }

    display.html(displayText);

}
