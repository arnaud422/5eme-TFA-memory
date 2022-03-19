//variables

/* #### variable objet HTML #### */
const canvas = document.getElementById('jeu')


/* #### variable pur js #### */
tailleGrille = 4
paireImages = []
tableauVirtuel = new Array(tailleGrille * tailleGrille)
peutJouer = false
carteVisible = 0


function obtenirCarte(x, y){
    return y * tailleGrille + x
}
//function qui permet de créer le tableau [paireImages] en fonction de la taille de la grille
function createPaireInTable(){
    var i, j
    if(!peutJouer){
        for(var i = 0; i < tailleGrille * 2; i++){
            for(var j = 0; j<2; j++){
                paireImages.push([`./asset/images/${i}.png`, i])
            }
            paireImages = tableShuffle(paireImages)
        }
    }
}

//function qui permet de mélanger le tableau
function tableShuffle(tab){
    var i, randomIndex, tmp

    for(var i = tab.length - 1; i > 0; i--){
        randomIndex = Math.floor(Math.random() * (i+1))
        tmp = tab[i]
        tab[i] = tab[randomIndex]
        tab[randomIndex] = tmp
    }

    return tab;
}

//function qui permet de créer le tableau html
function createTablePhysic(){
    var x,y
    let table = "<table>"
    
    if(!peutJouer){
        for(x = 0; x < tailleGrille; x++){
            table += `<tr class="${x}">`
            for(y = 0; y < tailleGrille; y++){
                table += `<td onclick="montrerCarte(${y},${x})"><p class="text-card">Afficher</p><img src="${paireImages[obtenirCarte(y, x)][0]}" class="hidden" alt="Carte de jeu"/></td>`   
            }
            table += "</tr>";
        }
    
        table += "</table>";
        canvas.innerHTML += table
        td = document.querySelectorAll('td')
    }
}

function demarrerSession(){
    createPaireInTable()
    createTablePhysic()
    peutJouer = !peutJouer
    
}

//function qui trouve et retourne la carte selectionner
function montrerCarte(x,y){
    carte = obtenirCarte(x,y)
    console.log(carte)
    if(carteVisible < 2){
         console.log(paireImages[carte])
    }
}

demarrerSession()