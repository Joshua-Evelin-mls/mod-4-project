import './style.css'
import './vanilla.css'
import 'material-icons/iconfont/material-icons.css';
import {render,collection,temp, populatePopUp} from './domHelpers.js'

render()

// seting up our headline
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
    localStorage.setItem('collection',JSON.stringify({data:structuredClone(collection)}))
    render()

})

inject.addEventListener('click',(e)=>{
  
  const _ = e.target.closest('li')
  console.log('ee')
  if(_){
    if(document.querySelectorAll('.chosen').length<5){
    console.log('hi')
    _.classList.remove('unchosen')
    _.classList.add('chosen')
  }
}
})