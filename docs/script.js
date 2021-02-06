const genes = ['A', 'a', 'C', 'c', 'G', 'g', 'T', 't'];

document.querySelectorAll('.gene-numeric-input').forEach(item => {
  item.addEventListener('change', calculateAllMasses);
})

window.addEventListener('DOMContentLoaded', (event) => {
  calculateAllMasses();
});


function calculateAllMasses() {

  totalMassText = document.getElementById("total-mass");
  totalMassText.innerHTML = null;

  inputGeneText = document.getElementById('inputGeneText').value;
  subGenes = calculateGeneCombinations(inputGeneText);

  console.log(getInputGeneValues());
  for (let i=0; i<subGenes.length; i++) {
    totalMassText.innerHTML += (subGenes[i] + '<br>')
  }
  console.log(getInputMassesValue())
}


function getInputGeneValues() {
  values = []
  for (let i=0; i<genes.length; i++){
    let number = parseFloat(document.getElementById(`gene-${genes[i]}`).value);
    values.push(number)
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
    for (let j=i+1; j<geneText.length; j++) {
      subGenes.push(geneText.slice(i, j))
    }
  }
  return subGenes
}