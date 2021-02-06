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
}

document.querySelectorAll('.gene-numeric-input').forEach(item => {
  item.addEventListener('change', getGeneValues);
})