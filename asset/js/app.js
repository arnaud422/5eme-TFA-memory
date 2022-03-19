//variables

/* #### variable objet HTML #### */
const canvas = document.getElementById('jeu')
var img,p;


/* #### variable pur js #### */
tailleGrille = 4
paireImages = []
tableauVirtuel = new Array(tailleGrille * tailleGrille)
peutJouer = false
carteVisible = 0
var carteUn
var carteDeux

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
        img = document.querySelectorAll('img')
        p = document.querySelectorAll('p')
    }
}

function demarrerSession(){
    createPaireInTable()
    createTablePhysic()
    peutJouer = !peutJouer
    
}

//function qui trouve et retourne la carte selectionner
function montrerCarte(x,y){

    if(carteVisible == 0){
        carteUn = retournerCarter(x,y)
        
    }else if(carteVisible == 1){
        carteDeux = retournerCarter(x,y)

        verifieSiCarteIdentique(carteUn, carteDeux)
    }
}

function retournerCarter(x,y){
    if(carteVisible < 2){
        carte = obtenirCarte(x,y)

        changeEtatCarte(carte)
        carteVisible++

        return carte
    }
}

function verifieSiCarteIdentique(carteUn, carteDeux){
    
    if(paireImages[carteUn][1] == paireImages[carteDeux][1]){
        //alert('carte identique')

        carteVisible = 0
        carteUn = null
        carteDeux = null
    }else{
        //alert('pas identique')
        new Timeur(1,()=>{
            changeEtatCarte(carteUn)
            changeEtatCarte(carteDeux)

            carteVisible = 0
            carteUn = null
            carteDeux = null
        })   
    }
}

function changeEtatCarte(carte){
    p[carte].classList.toggle('hidden')
    img[carte].classList.toggle('hidden')
}

demarrerSession()