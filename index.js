// const gene = 'GAGCAATTTCTGAAGGTTTCAAAGAAGTGAACGTTGTTGGGCACAACGACGGGAATTCCTTGTG';
const gene = 'GAGCA';

const weights = {
    'A': 314.21,
    'C': 289.18,
    'G': 329.21,
    'T': 304.19
}

function gene_weight(gene){
    let weight = 0;
    for (let i=0; i<gene.length; i++){
        weight += weights[gene.charAt(i)]
    }
    return weight - 62.97 + 1.008
}

for (let i=0; i<gene.length; i++) {
    for (let j=gene.length; j>i; j--) {
        let sub_gene = gene.slice(i, j)
        let prefix_padding = '.'.repeat(i)
        let  suffix_padding = '.'.repeat(gene.length-j)
        console.log(`${prefix_padding}${sub_gene}${suffix_padding}  ${gene_weight(sub_gene)}`)
    }
}