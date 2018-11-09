class Genotype {
    
    constructor(targetLen) {
        this.genes = []; // to store genes (phrase characters)
        this.fitness = 0; // to see how well population member matches target
        // fill with random genes (chars)
        for (let i = 0; i < targetLen; i++) {
            this.genes[i] = getRandomChar();
        }
    }

    // count matching genes (chars) and set fitness as % of good matches
    calculateFitness(target) {
        let score = 0;
        for (let i = 0; i < this.genes.length; i++) {
            if (this.genes[i] === target.charAt(i)) {
                score++;
            }
        }
        this.fitness = score / target.length;
    }

    // cross genes with partner
    crossGenome(partner) {
        let child = new Genotype(this.genes.length);

        // get random split point
        // range from 1 to length-1 to allow crossing single genes not just ranges of genes
        let split = getRandomInt(1, this.genes.length - 1);
        for (let i = 0; i < this.genes.length; i++) {
            if (i < split) {
                child.genes[i] = this.genes[i];
            } else {
                child.genes[i] = partner.genes[i];
            }
        }
        return child;
    }

    // mutate to introduce genes that were not present in the statrting population 
    mutate(mutationRate) {
        for (let i = 0; i < this.genes.length; i++) {
            if (Math.random() < mutationRate) {
                this.genes[i] = getRandomChar();
            }
        }
    }

}