import './style.css'
import './vanilla.css'
import 'material-icons/iconfont/material-icons.css';
import { collection,temp, populatePopUp, renderCards, renderSpanish, spanishCollection, renderHeadline } from './domHelpers.js'

let _points = Number(localStorage.getItem('points'))||localStorage.setItem('points',0)||Number(localStorage.getItem('points'))
const dateLastGifted = localStorage.getItem('giftDate')||0
const translate = {'english':'A fun app for cat lovers to learn more about cats while looking at cute cats. Come in every day of the week to get up to 35 new cat pictures!','spanish':'Una aplicación divertida para amantes de los gatos donde puedes aprender más sobre los gatos mientras miras gatitos adorables. ¡Entra todos los días de la semana para obtener hasta 35 nuevas fotos de gatos!'}
let isSpanish = localStorage.getItem('language') === 'spanish'
let isEnglish = localStorage.getItem('language') === 'english'
const app = document.querySelector('#app')
app&&renderHeadline()

if (isSpanish) {
    console.log(`spanishCollection: ${spanishCollection}`)
    renderSpanish()
} else if (isEnglish) {
  renderCards()
}


// ensuring the popup shows up when we click the button
const pop = document.getElementById('pop-up')
pop&&document.getElementById('generate').addEventListener('click',()=>{
  pop.classList.remove('-translate-y-full');
  populatePopUp()
})

const next = document.getElementById('next')
next&&next.addEventListener('click',()=>{
    pop.classList.add('-translate-y-full');
    let chosen = document.querySelectorAll('.chosen')

    let isSpanish = localStorage.getItem('language') === 'spanish'

    for(let elem of chosen){
      if (isSpanish) {
        spanishCollection.push(temp[elem.dataset.id])
      } else {
        collection.push(temp[elem.dataset.id])
      }
    }

    localStorage.setItem('points',_points-chosen.length)
    _points-=chosen.length
    points.innerText = ' '+_points

    app.innerHTML = ''

    if (isSpanish) {
      localStorage.setItem('spanishCollection',JSON.stringify({data:structuredClone(spanishCollection)}))
      renderSpanish()

    } else {
      localStorage.setItem('collection', JSON.stringify({ data: structuredClone(collection) }))
      renderCards()
    }
})


const daily = document.getElementById('daily')

const today = new Date();
const formattedDate = String(today.toLocaleDateString('en-GB'));
console.log(formattedDate)
dateLastGifted==formattedDate?daily.setAttribute('disabled',true):''
daily&&daily.addEventListener('click', async ()=>{
  console.log(dateLastGifted)
    localStorage.setItem('giftDate',String(formattedDate))
    daily.setAttribute('disabled',true)
    localStorage.setItem('points',_points+5)
    _points+=5
    points.innerText = ' '+_points
})


const inject = document.getElementById('inject')
inject&&inject.addEventListener('click',(e)=>{
  
  const _ = e.target.closest('li')
  console.log('ee')
  if(_){
    if(_.classList.contains('chosen')){
    console.log('hi')
    _.classList.remove('chosen')
    _.classList.add('unchosen')
  } else if (document.querySelectorAll('.chosen').length<_points) {
    _.classList.remove('unchosen')
    _.classList.add('chosen')
  }
}
})


const reload = document.querySelector('#reload')
reload&&reload.addEventListener('click', () => {
  inject.innerHTML = ''
  populatePopUp()

})

const points = document.getElementById('points')
if(points){points.innerText = ' '+_points}


const play = document.getElementById('play')
const para = document.getElementById('para')
if(play){
  const curlang = localStorage.getItem('language')
  if(curlang=='spanish'){
    document.querySelector('.switch').classList.add('switch-on')
  console.log(curlang)}
  play.innerHTML = curlang=='spanish'?'Comenzar':'Start'
  para.innerHTML = translate[curlang]
}
const isSpanishDom = document.querySelector('.switch')

isSpanishDom.addEventListener('click', () => {
  const curlang = localStorage.getItem('language')
  console.log(curlang)
  localStorage.setItem('language', curlang=='spanish'?'english':'spanish')
  if(app)app.innerHTML = ''
  app&&renderHeadline()
  if(play){
  play.innerHTML = curlang=='spanish'?'Start':'Comenzar'
  para.innerHTML = translate[localStorage.getItem('language')]
}
  curlang=='spanish'?renderCards():renderSpanish()
  curlang=='spanish'?isSpanishDom.classList.remove('switch-on'):isSpanishDom.classList.add('switch-on')
})

