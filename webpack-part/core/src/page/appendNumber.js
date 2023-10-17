import { default as radColor, getRandom } from '../util/radColor'

const divContainer = document.getElementById('divContainer')
const divCenter = document.getElementById('divCenter')

export default function(n, isPrime) {
  const span = document.createElement('span')
  span.innerText = n
  if(isPrime) {
    let color = radColor()
    span.style.color = color
    genCenterPrimeNum(n, color)
  }
  divContainer.appendChild(span)

  genCenterNum(n)
}

function genCenterNum(n) {
  divCenter.innerText = n
}

function genCenterPrimeNum(n, color) {
  let div = document.createElement('div')
  div.className = 'center'
  div.style.color = color
  div.innerText = n

  document.body.appendChild(div)

  // 加入了div后，强行让页面渲染
  // 只要读取某个元素的位置或尺寸信息，则会导致浏览器重新渲染 reflow
  getComputedStyle(div).left

  div.style.transform = `translate(${getRandom(-150, 150)}px, ${getRandom(-150, 150)}px)`
  div.style.opacity = 0

  // let primeNumDomLen = document.getElementsByClassName('center')
  // let maxLen = 3
  // if(primeNumDomLen.length >= maxLen) {
  //   for (let index = 0; index < maxLen - 1; index++) {
  //     clearPrimeNumDom(primeNumDomLen[index])
  //   }
  // }
}

// function clearPrimeNumDom(dom) {
//   document.body.removeChild(dom)
// }