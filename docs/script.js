const genes = ['A', 'a', 'C', 'c', 'G', 'g', 'T', 't'];

document.querySelectorAll('.gene-numeric-input').forEach(item => {
  item.addEventListener('input', calculateAllMasses);
})

document.querySelector('#inputGeneText').addEventListener('input', calculateAllMasses);


window.addEventListener('DOMContentLoaded', (event) => {
  calculateAllMasses();
});


function calculateAllMasses() {
  // Get user input
  inputGene = document.getElementById('inputGeneText').value;
  singleGeneMasses = getInputGeneValues();
  massesToCheck = getInputMassesValue();

  // Reset output
  totalMassText = document.getElementById("total-mass");
  totalMassText.innerHTML = null;

  // Calculate the combinations
  subGenes = calculateGeneCombinations(inputGene);
  massesPerSubgene = calculateMassesPerSubgene(massesToCheck, subGenes, singleGeneMasses);

  // Print the result
  printMassesPerSubgene(massesPerSubgene, totalMassText);
  console.log(inputGene);
  console.log(singleGeneMasses);
  console.log(massesToCheck);
  console.log(massesPerSubgene);
}

function calculateMassesPerSubgene(masses, subGenes, singleGeneMasses) {
  result = [];
  for (var i=0; i<subGenes.length; i++) {
    let currentGeneMasses = [];
    let currentGene = {}
    currentGene['name'] = subGenes[i];
    currentGene['masses'] = currentGeneMasses;
    currentGene['mass'] = calculateGeneMass(subGenes[i], singleGeneMasses)
    result.push(currentGene)
  }
  return result;
}

function calculateGeneMass(gene, singleGeneMasses) {
  mass = 0;
  for (let i=0; i<gene.length; i++) {
    mass += singleGeneMasses[gene.charAt(i)]
  }
  return mass
}

function printMassesPerSubgene(massesPerSubgene, textElement) {
  for (let i=0; i<massesPerSubgene.length; i++) {
    rawLine = massesPerSubgene[i]
    lineToPrint = [rawLine['name'], rawLine['mass']].join(',')
    textElement.innerHTML += lineToPrint + '<br>'
  }
}

function getInputGeneValues() {
  values = {}
  for (let i=0; i<genes.length; i++){
    let number = parseFloat(document.getElementById(`gene-${genes[i]}`).value);
    values[genes[i]] = number;
  }
  return values
}

function getInputMassesValue() {
  massesToSearchFor = document.getElementById("masses-to-search").value;
  return massesToSearchFor.
    split(/[\s,]+/).
    map(parseFloat).
    filter(item => item === parseFloat(item))
}

function calculateGeneCombinations(geneText) {
  subGenes = []
  for (let i=0; i<geneText.length; i++) {
    for (let j=i+1; j<geneText.length+1; j++) {
      subGenes.push(geneText.slice(i, j))
    }
  }
  return subGenes
}