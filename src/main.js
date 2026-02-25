import './style.css'
import './vanilla.css'
import 'material-icons/iconfont/material-icons.css';
import { collection, temp, populatePopUp, renderCards, renderSpanish, spanishCollection, renderHeadline } from './domHelpers.js'

// --- State ---
let _points = Number(localStorage.getItem('points')) || localStorage.setItem('points', 0) || 0
const dateLastGifted = localStorage.getItem('giftDate') || 0
let isSpanish = localStorage.getItem('language') === 'spanish'
let isEnglish = localStorage.getItem('language') === 'english'

const translate = {
  english: 'A fun app for cat lovers to learn more about cats while looking at cute cats. Come in every day of the week to get up to 35 new cat pictures!',
  spanish: 'Una aplicación divertida para amantes de los gatos donde puedes aprender más sobre los gatos mientras miras gatitos adorables. ¡Entra todos los días de la semana para obtener hasta 35 nuevas fotos de gatos!'
}

// --- Initial Render ---
const app = document.querySelector('#app')
const points = document.getElementById('points')

if (app) {
  renderHeadline()
  if (isSpanish) renderSpanish()
  else if (isEnglish) renderCards()
}

if (points) points.innerText = ' ' + _points

// --- Points Display Helper ---
function syncPoints() {
  localStorage.setItem('points', _points)
  if (points) points.innerText = ' ' + _points
}

// --- Daily Reward ---
const daily = document.getElementById('daily')
const today = new Date()
const formattedDate = String(today.toLocaleDateString('en-GB'))

if (daily) {
  if (dateLastGifted == formattedDate) daily.setAttribute('disabled', true)
  daily.addEventListener('click', () => {
    localStorage.setItem('giftDate', formattedDate)
    daily.setAttribute('disabled', true)
    _points += 5
    syncPoints()
  })
}

// --- Pop-up ---
const pop = document.getElementById('pop-up')
const inject = document.getElementById('inject')
const reload = document.querySelector('#reload')

if (pop) {
  document.getElementById('generate').addEventListener('click', () => {
    pop.classList.remove('-translate-y-full')
    populatePopUp()
  })
}

if (inject) {
  inject.addEventListener('click', (e) => {
    const _ = e.target.closest('li')
    if (!_) return
    if (_.classList.contains('chosen')) {
      _.classList.remove('chosen')
      _.classList.add('unchosen')
    } else if (document.querySelectorAll('.chosen').length < _points) {
      _.classList.remove('unchosen')
      _.classList.add('chosen')
    }
  })
}

if (reload) reload.addEventListener('click', () => {
  inject.innerHTML = ''
  populatePopUp()
})

const next = document.getElementById('next')
if (next) {
  next.addEventListener('click', () => {
    pop.classList.add('-translate-y-full')
    const chosen = document.querySelectorAll('.chosen')
    const isSpanish = localStorage.getItem('language') === 'spanish'

    for (let elem of chosen) {
      isSpanish
        ? spanishCollection.push(temp[elem.dataset.id])
        : collection.push(temp[elem.dataset.id])
    }

    _points -= chosen.length
    syncPoints()
    app.innerHTML = ''

    if (isSpanish) {
      localStorage.setItem('spanishCollection', JSON.stringify({ data: structuredClone(spanishCollection) }))
      renderSpanish()
    } else {
      localStorage.setItem('collection', JSON.stringify({ data: structuredClone(collection) }))
      renderCards()
    }
  })
}

// --- Language Switch ---
const isSpanishDom = document.querySelector('.switch')
const play = document.getElementById('play')
const para = document.getElementById('para')

if (isSpanishDom) {
  isSpanishDom.addEventListener('click', () => {
    const curlang = localStorage.getItem('language')
    const newlang = curlang === 'spanish' ? 'english' : 'spanish'
    localStorage.setItem('language', newlang)

    if (app) { app.innerHTML = ''; renderHeadline() }
    if (play) { play.innerHTML = newlang === 'spanish' ? 'Comenzar' : 'Start'; para.innerHTML = translate[newlang] }

    newlang === 'spanish' ? renderSpanish() : renderCards()
    newlang === 'spanish' ? isSpanishDom.classList.add('switch-on') : isSpanishDom.classList.remove('switch-on')
  })
}

if (isSpanishDom && localStorage.getItem('language') === 'spanish') {
  isSpanishDom.classList.add('switch-on')
}

  const formP = document.getElementById('form-pop-up')
  const form = document.querySelector('form')
  const formBtn = document.getElementById('form-btn')
  const submit = document.getElementById('submit')
  const closeForm =document.getElementById('close-form')
  closeForm.addEventListener('click',(e)=>{e.preventDefault();formP.classList.add('-translate-y-full')})
  formBtn.addEventListener('click', () => formP.classList.remove('-translate-y-full'))

  submit.addEventListener('click', async (e) => {
    e.preventDefault()
    if (form.elements.feedback.value.length <= 20) return alert("hey.... make it longer!")

    formP.classList.add('-translate-y-full')
    try {
      const response = await fetch("https://formspree.io/f/xaqdalyq", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ feedback: form.elements.feedback.value }),
      })
      if (response.ok) {
        alert("thank you for your feedback")
        _points += 10
        syncPoints()
        form.reset()
      } else {
        alert("Something went wrong.")
      }
    } catch (error) {
      console.error(error)
      alert("Network error.")
    }
  })
// --- Home Page (play button, feedback) ---
if (play) {
  const curlang = localStorage.getItem('language')

  play.innerHTML = curlang === 'spanish' ? 'Comenzar' : 'Start'
  para.innerHTML = translate[curlang]

}