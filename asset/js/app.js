//variables

/* #### variable objet HTML #### */
const canvas = document.getElementById('jeu')

/* #### variable pur js #### */
tailleGrille = 4
paireImages = []
tableauVirtuel = new Array(tailleGrille * tailleGrille)

//function qui permet de créer le tableau [paireImages] en fonction de la taille de la grille
function createPaireInTable(){
    var i, j

    for(var i = 0; i <= tailleGrille * 2; i++){
        for(var j = 0; j<2; j++){
            paireImages.push([`./asset/images/${i}.png`, i])
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

    for(x = 0;x < tailleGrille; x++){
        table += "<tr>"
        for(y = 0; y < tailleGrille; y++){
         table += `<td><img src="${paireImages[(y*tailleGrille+x)][0]}" alt="Carte de jeu"/></td>`   
        }
        table += "</tr>";
    }
    table += "</table>";
    canvas.innerHTML += table
}