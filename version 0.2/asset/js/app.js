//variables
const container = document.querySelector('.container')
let score = document.getElementById("score")
let pCard, imgCard

gridSize = 4
picturePair = []
canPlay = false
paireFound = []
visibleCard = 0
let OneCard,twoCard
let table

//fonction qui permet d'obtenir la position de la cartes
function getCard(x, y) {
    return y * gridSize + x
}
//Function qui permet de mettre les images dans la tableau
function createPicturePair() {
    if (!canPlay) {
        for (let i = 0; i < gridSize * 2; i++) {
            for (let j = 0; j < 2; j++) {
                picturePair.push(`./asset/images/${i}.png`)
            }
        }
        //melanger la tableau
        picturePair = tabShuffle(picturePair)
    }
}

//function qui permet de mélanger le tableau
function tabShuffle(tab) {
    let randomIndex
    let tmp

    for (let i = tab.length - 1; i > 0; i--) {
        randomIndex = Math.floor(Math.random() * (i + 1))
        tmp = tab[i]
        tab[i] = tab[randomIndex]
        tab[randomIndex] = tmp
    }

    return tab
}
//création d'un tableau physique
function physicalArray() {

    if (!canPlay) {
        table = document.createElement("table")

        for (y = 0; y < gridSize; y++) {
            tr = document.createElement('tr');
            table.appendChild(tr)

            for (x = 0; x < gridSize; x++) {
                td = document.createElement('td');
                td.setAttribute('onclick', `cardClick(${getCard(x, y)})`);

                p = document.createElement('p')
                p.setAttribute('class', 'text-card');
                p.appendChild(document.createTextNode("afficher"));

                img = document.createElement('img')
                img.setAttribute('src', `${picturePair[getCard(x, y)]}`)
                img.setAttribute('alt', 'image carte');
                img.setAttribute('class', 'img-card hidden');

                td.appendChild(p)
                td.appendChild(img)
                tr.appendChild(td)
            }
        }

        container.appendChild(table)
        pCard = document.querySelectorAll(".text-card")
        imgCard = document.querySelectorAll(".img-card")
    }
}

function cardClick(card) {
    if(paireFound.indexOf(picturePair[card]) === -1){
        visibleCard++
    }else{
        return
    }

    if (visibleCard === 1) {
        OneCard = card
        cardReturn(card)
    }
    if(visibleCard === 2){
        twoCard = card
        cardReturn(card)

        if(picturePair[OneCard] === picturePair[twoCard]){
            visibleCard = 0
            score.innerText == 0 ?  score.innerText = 0 : score.innerText-- 
            paireFound.push(picturePair[OneCard])
            if(paireFound.length === 8){
                container.removeChild(table)
                
                new Timeur(3,()=>{
                    main()
                })
            }
        }else{
            new Timeur(1,()=>{
                cardReturn(OneCard)
                cardReturn(twoCard)
                score.innerText++
                visibleCard = 0
            })   
        }
    }
    return
}

function cardReturn(card) {
    if(paireFound.indexOf(picturePair[card]) === -1){
        imgCard[card].classList.toggle('hidden')
        pCard[card].classList.toggle('hidden')
    }   
}

function main() {
    picturePair = []
    canPlay = false
    paireFound = []
    visibleCard = 0
    let OneCard,twoCard

    createPicturePair()
    physicalArray()
}

main()