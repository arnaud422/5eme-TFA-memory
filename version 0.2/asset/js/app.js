//variables
const container = document.querySelector('.container')

gridSize = 4
picturePair = []
canPlay = false

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
    let table

    if (!canPlay) {
        table = document.createElement("table")

        for (y = 0; y < gridSize; y++){
            tr = document.createElement('tr');
            table.appendChild(tr)

            for(x=0; x < gridSize; x++){
                td = document.createElement('td');

                p = document.createElement('p')
                p.setAttribute('class', 'text-card');
                p.appendChild(document.createTextNode("afficher"));

                img = document.createElement('img')
                img.setAttribute('src', `${picturePair[y*gridSize+x]}`)
                img.setAttribute('alt', 'image carte');
                img.setAttribute('class', 'hidden');

                td.appendChild(p)
                td.appendChild(img)
                tr.appendChild(td)
            }
        }

        container.appendChild(table)
    }
}

function main(){
    createPicturePair()
    physicalArray()
}

main()