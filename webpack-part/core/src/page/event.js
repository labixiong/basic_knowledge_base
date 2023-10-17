import NumberTimer from '../util/number'
import appendNumber from './appendNumber';

const n = new NumberTimer()

n.onCreatedNumber = function(n, isPrime) {
  // console.log(n, isPrime);
  appendNumber(n, isPrime)
}

let isStart = false;

window.onclick = function() {
  if(isStart) {
    n.stop()
    isStart = false
  } else {
    n.start()
    isStart = true
  }
}
