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

        // let split = getRandomInt(this.genes.length * 0.25, this.genes.length * 0.75);
        let split = getRandomInt(0, this.genes.length);
        for (let i = 0; i < this.genes.length; i++) {
            if (i < split) {
                child.genes[i] = this.genes[i];
            } else {
                child.genes[i] = partner.genes[i];
            }
        }
        return child;
    }

    mutate(mutationRate) {
        for (let i = 0; i < this.genes.length; i++) {
            if (Math.random() < mutationRate) {
                console.log('Mutation (old gene): ' + this.genes[i]);
                this.genes[i] = getRandomChar();
                console.log('Mutation (new gene): ' + this.genes[i]);
            }
        }
    }

}