import { fetchCatImgs } from "./dataRetrieval"

export let collection = JSON.parse(localStorage.getItem('collection'))?.data||[]
export let temp = []

const app = document.querySelector('#app')
export const render = () => {
        app.innerHTML = ``
    for (let item of collection) {
        let liCard = document.createElement('li')
        liCard.classList.add('collected-card')

        let figure = document.createElement('figure')
        figure.classList.add('card-figure')
        liCard.append(figure)

        let div = document.createElement('div')
        div.classList.add('card-bg')
        div.classList.add('card')
        figure.append(div)

        div.style.backgroundImage = `url('${item.url}')` 

        app.append(liCard)
    }
 
}

const pop = document.querySelector('#pop-up')
const inject = document.querySelector('#inject')

export const populatePopUp = async () => {
    temp = (await fetchCatImgs()).data
    inject.innerHTML = ``
    let x = 0;
    for (let item of temp) {
        let liCard = document.createElement('li')
        liCard.dataset.id = x
        liCard.classList.add('collected-card')

        let figure = document.createElement('figure')
        figure.classList.add('card-figure')
        liCard.append(figure)

        let div = document.createElement('div')
        div.classList.add('card-bg')
        div.classList.add('card')
        figure.append(div)

        div.style.backgroundImage = `url('${item.url}')` 

        inject.append(liCard)
        x++;
    }
 
}
