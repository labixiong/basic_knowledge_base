let inputs = document.getElementsByTagName('input')

for (const input of inputs) {
  input.oninput = function() {
    let err = document.querySelector('.error')
    if(err) {
      err.remove()
    }
  }  
}
