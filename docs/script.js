const genes = ['A', 'a', 'C', 'c', 'G', 'g', 'T', 't'];

document.querySelectorAll('.gene-numeric-input').forEach(item => {
  item.addEventListener('change', calculateAllMasses);
})

function calculateAllMasses() {

  totalMassText = document.getElementById("total-mass");
  inputGeneText = document.getElementById('inputGeneText').value;
  totalMassText.innerHTML = null;
  console.log(getInputGeneValues());

  subGenes = geneCombinations(inputGeneText);
  for (let i=0; i<subGenes.length; i++) {
    totalMassText.innerHTML += (subGenes[i] + '<br>')
  }
  console.log(getMasses())
}

function getInputGeneValues() {
  values = []
  for (let i=0; i<genes.length; i++){
    let number = parseFloat(document.getElementById(`gene-${genes[i]}`).value);
    values.push(number)
  }
  return values
}

function getMasses() {
  massesToSearchFor = document.getElementById("masses-to-search").value;
  return massesToSearchFor.
    split(/[\s,]+/).
    map(parseFloat).
    filter(item => item === parseFloat(item))
}

function geneCombinations(geneText) {
  subGenes = []
  for (let i=0; i<geneText.length; i++) {
    for (let j=i+1; j<geneText.length; j++) {
      subGenes.push(geneText.slice(i, j))
    }
  }
  return subGenes
}