//variables

/* #### variable objet HTML #### */
const canvas = document.getElementById('jeu')
let scoreInner = document.getElementById('score')
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
        p = document.querySelectorAll('.text-card')
    }
}

function demarrerSession(){
    peutJouer = false   
    paireImages = []
    tableauVirtuel = new Array(tailleGrille * tailleGrille)
    scoreInner.innerText = 0
    canvas.innerHTML = ''

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
        if(carteDeux != undefined){
            tableauVirtuel[carteUn] = paireImages[carteUn][1]
            tableauVirtuel[carteDeux] = paireImages[carteDeux][1]
    
            carteUn+1 && carteDeux != undefined ? verifieSiCarteIdentique(carteUn, carteDeux) : null  
        }
        
    }   
}

function retournerCarter(x,y){
    if(carteVisible < 2){
        carte = obtenirCarte(x,y)

        if(tableauVirtuel[carte] != paireImages[carte][1]){
            carteVisible++
            console.log(carte)
            changeEtatCarte(carte)

            return carte
        }
        return;
    }
}

function verifieSiCarteIdentique(carteUn, carteDeux){
    
    if(paireImages[carteUn][1] == paireImages[carteDeux][1]){
        //alert('carte identique')
        // tableauVirtuel[carteUn] = paireImages[carteUn][1]
        // tableauVirtuel[carteDeux] = paireImages[carteDeux][1]
        
        carteVisible = 0
        carteUn = null
        carteDeux = null

        scoreInner.innerText <= 0 ? scoreInner.innerText = 0 : scoreInner.innerText--

        isVictoire()
    }else{
        //alert('pas identique')
        scoreInner.innerText++
        tableauVirtuel[carteUn] = undefined
        tableauVirtuel[carteDeux] = undefined
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

function isVictoire(){
    i = 0
    tableauVirtuel.forEach(element => {
        i++
        if(i==15){
            console.log('Victoire')

            new Timeur(4, ()=>{
                demarrerSession()
            })
        }
    });
}

demarrerSession()