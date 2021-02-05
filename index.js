// const gene = 'GAGCAATTTCTGAAGGTTTCAAAGAAGTGAACGTTGTTGGGCACAACGACGGGAATTCCTTGTG';
const gene = 'GAGCA';

weights = {
    'A': 1,
    'C': 2,
    'G': 3,
    'T': 4
}

function gene_weight(gene){
    weight = 0;
    for (let i=0; i<gene.length; i++){
        weight += weights[gene.charAt(i)]
    }
    return weight
}

for (let i=0; i<gene.length; i++) {
    for (let j=gene.length; j>i; j--) {
        sub_gene = gene.slice(i, j)
        prefix_padding = '.'.repeat(i)
        suffix_padding = '.'.repeat(gene.length-j)
        console.log(`${prefix_padding}${sub_gene}${suffix_padding}  ${gene_weight(sub_gene)}`)
    }
}