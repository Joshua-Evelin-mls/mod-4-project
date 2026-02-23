import { fetchCatImgs, fetchCatFacts } from "./dataRetrieval.js"

export let collection = JSON.parse(localStorage.getItem('collection'))?.data||[]
export let temp = []


     

const app = document.querySelector('#app') 

const pop = document.querySelector('#pop-up')
const inject = document.querySelector('#inject')

export const populatePopUp = async () => {
    temp = (await fetchCatImgs()).data
    inject.innerHTML = ``
    let x = 0;
    for (let item of temp) {
        let liCard = document.createElement('li')
        liCard.dataset.id = x
        liCard.classList.add('pop-up-collected-card')

        let figure = document.createElement('figure')
        figure.classList.add('pop-up-card-figure')
        liCard.append(figure)

        let div = document.createElement('div')
        div.classList.add('pop-up-card-bg')
        div.classList.add('pop-up-card')
        figure.append(div)

        div.style.backgroundImage = `url('${item.url}')` 

        inject.append(liCard)
        x++;
    }
 
}



export const renderCards = async () => {

    let savedCatFacts = JSON.parse(localStorage.getItem('facts')) || {}

    const deleted = new Set(JSON.parse(localStorage.getItem('deletedCards')) || [])

    let newCatFacts = await Promise.all(
        collection.map(async (item) => {
            if (savedCatFacts[item.url]) return savedCatFacts[item.url]
            const result = await fetchCatFacts()
            const fact = result.data.data
            savedCatFacts[item.url] = fact
            return fact
        })
    )

    localStorage.setItem('facts', JSON.stringify(savedCatFacts))

    for (let i = 0; i < collection.length; i++) {
        let item = collection[i]
        let catFact = newCatFacts[i]

        if (deleted.has(item.url)) continue 

        
        let fullCard = document.createElement('div')
        fullCard.classList.add('full-card')
        
        let innerCard = document.createElement('div')
        innerCard.classList.add('inner-card')
        
        const xButton = document.createElement('button')
        xButton.classList.add('x-button')
        xButton.type = 'button'
        xButton.textContent = 'x'

        let frontLi = document.createElement('li')
        frontLi.classList.add('collected-card')

        let figure = document.createElement('figure')
        figure.classList.add('card-figure')
        frontLi.append(figure)

        let div = document.createElement('div')
        div.classList.add('card-bg', 'card')
        div.style.backgroundImage = `url('${item.url}')`
        figure.append(div)
        

        
        let backLi = document.createElement('li')
        backLi.classList.add('collected-card-back')

        let figure2 = document.createElement('div')
        figure2.classList.add('card-figure')
        backLi.append(figure2)

        let card = document.createElement('div')
        card.classList.add('card')
        figure2.append(card)

        let cardBg = document.createElement('div')
        cardBg.classList.add('card-bg')
        card.append(cardBg)

        let p = document.createElement('p')
        p.classList.add('did-you-know')
        p.textContent = 'Did You Know?'

        let p2 = document.createElement('p')
        p2.classList.add('cat-fact')
        p2.textContent = catFact

        cardBg.append(p, p2)
        
        
        innerCard.append(frontLi, backLi)
        fullCard.append(innerCard, xButton)

        fullCard.addEventListener('click', () => {
            innerCard.classList.toggle('flipped')
        })

        xButton.addEventListener('click', () => {
            deleted.add(item.url)
            localStorage.setItem('deletedCards', JSON.stringify([...deleted]));

            const cardIndex = collection.findIndex(i => i.url === item.url) 
            if (cardIndex !== -1) collection.splice(cardIndex, 1)
            
            localStorage.setItem('collection', JSON.stringify({data: structuredClone(collection)})) 
           
            fullCard.remove()
        })

        app.append(fullCard)
    }
}