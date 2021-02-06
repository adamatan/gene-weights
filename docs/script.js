const genes = ['A', 'a', 'C', 'c', 'G', 'g', 'T', 't'];

document.querySelectorAll('.gene-numeric-input').forEach(item => {
  item.addEventListener('input', calculateAllMasses);
})

document.querySelector('#inputGeneText').addEventListener('input', calculateAllMasses);
document.querySelector('#masses-to-search').addEventListener('input', calculateAllMasses);


window.addEventListener('DOMContentLoaded', (event) => {
  calculateAllMasses();
});


document.querySelector('#csv-download-link').addEventListener('click', () =>
{downloadCSV()} )

function downloadCSV() {
  element = document.getElementById('csv-download-link')
  a = document.createElement('a');
  document.body.appendChild(a);
  a.download = 'Gene_Masses.csv';

  massesToCheck = getInputMassesValue();

  a.href = `data:text/csv;charset=utf-8,${element.href}`;
  a.click();
}


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
  headerLine = getHeaderLine(massesToCheck)
  totalMassText.innerHTML += headerLine + '<br>'
  geneMassLines = getGeneMassLines(massesPerSubgene);
  totalMassText.innerHTML += geneMassLines.join('<br>')

  // Update the counter title
  updateResultsTitle(inputGene, geneMassLines)

  // Set CSV download data
  setCSVDonloadData(headerLine, geneMassLines)
}

function updateResultsTitle(inputGene, geneMassLines) {
  resultsTitle = document.getElementById('total-mass-title');
  resultsTitle.innerHTML = `Total mass per sub-gene (gene length ${inputGene.length}, ${geneMassLines.length} subgenes)`
}

function setCSVDonloadData(headerLine, geneMassLines){
  element = document.getElementById('csv-download-link')
  element.href = headerLine + '\n';
  for (let i=0; i<geneMassLines.length; i++) {
    element.href += geneMassLines[i] + '\n'
  }
}

function calculateMassesPerSubgene(massesToCheck, subGenes, singleGeneMasses) {
  result = [];
  for (var i=0; i<subGenes.length; i++) {
    let currentGeneMasses = [];
    let currentGene = {}
    let mass = calculateGeneMass(subGenes[i].subgene, singleGeneMasses)
    currentGene['name'] = subGenes[i].subgene;
    currentGene['dotted'] = subGenes[i].dotted;
    currentGene['masses'] = [];
    currentGene['mass'] = mass
    smallestMassDelta = massesToCheck[0]-mass

    for (let j=0; j<massesToCheck.length; j++) {
      currentGene['masses'].push(massesToCheck[j]-mass)
      if (Math.abs(massesToCheck[i]-mass) < Math.abs(smallestMassDelta)) {
        smallestMassDelta = massesToCheck[i]-mass
      }
    }
    currentGene.minimumDelta = smallestMassDelta
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

function getHeaderLine(massesToCheck){
  lineToPrint = ['Dotted Gene', 'Gene', 'Mass']
  for (let i=0; i<massesToCheck.length; i++) {
    lineToPrint.push(`Delta(${massesToCheck[i]})`)
  }
  lineToPrint.push('Minimum delta')
  return lineToPrint.join(',')
}

function getGeneMassLines(massesPerSubgene) {
  geneMassLines = []
  for (let i=0; i<massesPerSubgene.length; i++) {
    rawLine = massesPerSubgene[i]
    lineToPrint = [rawLine['dotted'], rawLine['name'], rawLine['mass']]
    lineToPrint = lineToPrint.concat(rawLine['masses'])
    lineToPrint = lineToPrint.concat(rawLine.minimumDelta)
    lineToPrint = lineToPrint.join(',')
    geneMassLines.push(lineToPrint)
  }
  return geneMassLines;
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
      subgene = geneText.slice(i, j)
      dotted = '.'.repeat(i) + subgene + '.'.repeat(geneText.length-j)
      subGenes.push({subgene, dotted})
    }
  }
  return subGenes
}