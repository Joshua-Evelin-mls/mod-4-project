import './style.css'
import './vanilla.css'
import 'material-icons/iconfont/material-icons.css';
import { collection,temp, populatePopUp, renderCards } from './domHelpers.js'

let _points = Number(localStorage.getItem('points'))||localStorage.setItem('points',0)||Number(localStorage.getItem('points'))
const dateLastGifted = localStorage.getItem('giftDate')||0


if (collection.length > 0) {
  renderCards()
}
//console.log(collection)

// setting up our headline
const headlines = ['Purr-fect Pulls', 'The Kitty Cache', 'Whisker Vault', 'Paw-picked Cards', 'The Meowstash', 'Purrfolio', 'The Cat-alog']
const headline = headlines[Math.floor(Math.random() * headlines.length)]
document.getElementById('headline').innerText = headline


// ensuring the popup shows up when we click the button
const pop = document.getElementById('pop-up')
document.getElementById('generate').addEventListener('click',()=>{
  pop.classList.remove('-translate-y-full');
  populatePopUp()
})

const next = document.getElementById('next')
next.addEventListener('click',()=>{
    pop.classList.add('-translate-y-full');
    let chosen = document.querySelectorAll('.chosen')
    for(let elem of chosen){
      collection.push(temp[elem.dataset.id])
    }
    localStorage.setItem('points',_points-chosen.length)
    _points-=chosen.length
    points.innerText = ' '+_points
    localStorage.setItem('collection',JSON.stringify({data:structuredClone(collection)}))

    app.innerHTML = ''
    renderCards()
})

const daily = document.getElementById('daily')

const today = new Date();
const formattedDate = String(today.toLocaleDateString('en-GB'));
console.log(formattedDate)
dateLastGifted==formattedDate?daily.setAttribute('disabled',true):''
daily.addEventListener('click', async ()=>{
  console.log(dateLastGifted)
    localStorage.setItem('giftDate',String(formattedDate))
    daily.setAttribute('disabled',true)
    localStorage.setItem('points',_points+5)
    _points+=5
    points.innerText = ' '+_points
})


const inject = document.getElementById('inject')
inject.addEventListener('click',(e)=>{
  
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
reload.addEventListener('click', () => {
  inject.innerHTML = ''
  populatePopUp()

})
const points = document.getElementById('points')
points.innerText = ' '+_points
