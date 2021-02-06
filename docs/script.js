const genes = ['A', 'a', 'C', 'c', 'G', 'g', 'T', 't'];

function getGeneValues() {
  values = []
  totalMass = document.getElementById("total-mass");
  totalMass.innerHTML = '';
  for (let i=0; i<genes.length; i++){
    let number=document.getElementById(`gene-${genes[i]}`).value;
    values.push(number)
    totalMass.innerHTML += (number.toString() + '<br>');
  }
  console.log(values);
  geneText = document.getElementById('geneText').value;
  console.log(geneCombinations(geneText))
}

document.querySelectorAll('.gene-numeric-input').forEach(item => {
  item.addEventListener('change', getGeneValues);
})


function geneCombinations(geneText) {
  subGenes = []
  for (let i=0; i<geneText.length; i++) {
    subGenes.push(geneText.slice(0, i))
  }
  return subGenes;
}