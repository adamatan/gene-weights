// const gene = 'GAGCAATTTCTGAAGGTTTCAAAGAAGTGAACGTTGTTGGGCACAACGACGGGAATTCCTTGTG';
const gene = 'gaGCA';

const weights = {
    'A': 313.21,
    'C': 289.18,
    'G': 329.21,
    'T': 304.19,
    'a': 313.21 + 16.061,
    'c': 289.18 + 16.061,
    'g': 329.21 + 16.061,
    't': 304.19 + 16.061
}

const masses = [100, 300, 600, 1000, 1500, 1550, 2000]

function find_closest_mass(mass){
    let closest_mass = masses[0]
    for (let i=0; i<masses.length; i++){
        if (Math.abs(masses[i]-mass) < Math.abs(closest_mass-mass)) {
            closest_mass = masses[i];
        }
    }
    return closest_mass
}

function mass_differences(gene_weight) {
    return masses.map(i => gene_weight-i)
}

function calculate_gene_weight(gene){
    let weight = 0;
    for (let i=0; i<gene.length; i++){
        weight += weights[gene.charAt(i)]
    }
    return weight - 62.97 + 1.008
}

function print_titles(){
    let titles = ['Gene', 'Left (5)', 'Right(3)', 'Mass']
    for (let i=0; i<masses.length; i++) {
        titles.push(masses[i].toString())
    }
    console.log(titles.join(','))
}

print_titles()
for (let i=0; i<gene.length; i++) {
    for (let j=gene.length; j>i; j--) {
        let sub_gene = gene.slice(i, j)
        let right_chop = i
        let left_chop = gene.length-j
        let prefix_padding = '.'.repeat(right_chop)
        let suffix_padding = '.'.repeat(left_chop)
        let gene_weight = calculate_gene_weight(sub_gene)
        let closest_mass = find_closest_mass(gene_weight);
        let mass_difference = closest_mass - gene_weight;
        let output = `${prefix_padding}${sub_gene}${suffix_padding} ,` +
            `${right_chop}, ${left_chop}, ${gene_weight}` +
            `${closest_mass}, ${mass_differences(gene_weight)}`
        console.log(output)
    }
}