const genes = ['A', 'a', 'C', 'c', 'G', 'g', 'T', 't'];

document.querySelectorAll('.gene-numeric-input').forEach(item => {
  item.addEventListener('input', calculateAllMasses);
})

document.querySelector('#inputGeneText').addEventListener('input', calculateAllMasses);
document.querySelector('#masses-to-search').addEventListener('input', calculateAllMasses);


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
  printHeaderLine(massesToCheck, totalMassText)
  printMassesPerSubgene(massesPerSubgene, totalMassText);
}

function calculateMassesPerSubgene(massesToCheck, subGenes, singleGeneMasses) {
  result = [];
  for (var i=0; i<subGenes.length; i++) {
    let currentGeneMasses = [];
    let currentGene = {}
    let mass = calculateGeneMass(subGenes[i], singleGeneMasses)
    currentGene['name'] = subGenes[i];
    currentGene['masses'] = [];

    currentGene['mass'] = mass

    for (let j=0; j<massesToCheck.length; j++) {
      currentGene['masses'].push(massesToCheck[j]-mass)
    }
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

function printHeaderLine(massesToCheck, textElement){
  lineToPrint = ['Gene', 'Mass']
  for (let i=0; i<massesToCheck.length; i++) {
    lineToPrint.push(`Delta(${massesToCheck[i]})`)
  }
  textElement.innerHTML += lineToPrint.join(',') + '<br>';
}

function printMassesPerSubgene(massesPerSubgene, textElement) {
  for (let i=0; i<massesPerSubgene.length; i++) {
    rawLine = massesPerSubgene[i]
    lineToPrint = [rawLine['name'], rawLine['mass']]
    lineToPrint = lineToPrint.concat(rawLine['masses']).join(',')
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