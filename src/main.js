import './style.css'
import './vanilla.css'
import 'material-icons/iconfont/material-icons.css';

// seting up our headline
const headlines = ['Purr-fect Pulls', 'The Kitty Cache', 'Whisker Vault', 'Paw-picked Cards', 'The Meowstash', 'Purrfolio', 'The Cat-alog']
const headline = headlines[Math.floor(Math.random() * headlines.length)]
document.getElementById('headline').innerText = headline


// ensuring the popup shows up when we click the button
const pop = document.getElementById('pop-up')
document.getElementById('generate').addEventListener('click',()=>{
  pop.classList.remove('-translate-y-full');
})

const next = document.getElementById('next')
next.addEventListener('click',()=>{
    pop.classList.add('-translate-y-full');
})