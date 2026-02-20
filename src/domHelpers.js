let collection = [
    {"id":"s","url":"https://28.media.tumblr.com/tumblr_krvvxawUd81qa9hjso1_1280.jpg","width":378,"height":500},
    {"id":"15f","url":"https://cdn2.thecatapi.com/images/15f.jpg","width":500,"height":333},
    {"id":"1gt","url":"https://cdn2.thecatapi.com/images/1gt.gif","width":190,"height":355},
    {"id":"cj5","url":"https://cdn2.thecatapi.com/images/cj5.jpg","width":1024,"height":683},
    {"id":"cn7","url":"https://cdn2.thecatapi.com/images/cn7.jpg","width":600,"height":900},
    {"id":"cpa","url":"https://cdn2.thecatapi.com/images/cpa.jpg","width":2856,"height":2142},
    {"id":"d6m","url":"https://cdn2.thecatapi.com/images/d6m.gif","width":500,"height":281},
    {"id":"d75","url":"https://cdn2.thecatapi.com/images/d75.jpg","width":500,"height":313},
    {"id":"MTg4MzEwNg","url":"https://cdn2.thecatapi.com/images/MTg4MzEwNg.jpg","width":427,"height":640},
    {"id":"SMuZx-bFM","url":"https://cdn2.thecatapi.com/images/SMuZx-bFM.jpg","width":3000,"height":2000}
]
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
        liCard.append(div)

        div.style.backgroundImage = `url('${item.url}')` 

        app.append(liCard)
    }
 
}
