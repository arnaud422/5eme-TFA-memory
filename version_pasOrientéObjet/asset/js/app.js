

//variables
const tailleGrille = 4
let pairesGame = [] //tableau qui contiendra les paires mélangé
let positionCarteRetoune = [] //tableau qui contiendra les paires troouvé
let carteRoutourne = 0
let positionUn = 0
let positionDeux = 0
let peuJouer = false

const game = document.getElementById('game')

//  Function qui permet de créer le tableau de base (virtuel)
function createTabPairesGame(){

    /*
        [path]: chaine de caractères -> contient le chemin relatif aux images
    */
    let path = './asset/images/'

    for(let i = 0; i < tailleGrille*2; i++){
        pairesGame.push(`${path + i}.png`)
        pairesGame.push(`${path + i}.png`)
    }
}

//  Function qui permet de mélanger un tableau  //
function shuffleTab(tab){
    /*
    [randomIndex] : entier -> contient un index aléatoire du tableau
    [index] : entier -> contient un index (celon la l'incrémentation de la boucle)
    */

    //Initialisation des variables
    let randomIndex,index = 0;

    //Mélanger le tableau
    for(var i = tab.length - 1; i > 0; i--){
        randomIndex = Math.floor(Math.random() * (i + 1))

        //échange les index
        index = tab[i]
        tab[i] = tab[randomIndex]
        tab[randomIndex] = index 
    }
    return tab
}

//  Function qui créer les elements HTML pour afficher les carte    //
function createCarteInPage(){
    for(let y=0; y< tailleGrille; y++){
        let ligne = '<div class="ligne">'
        for(let x = 0; x<tailleGrille; x++){
            //parcourir le tableau des paires trouvé et si le position existe effichier l'image 
            ligne += `<div class="card" onclick="clickTwocarte(${x}, ${y})"><span>Afficher</span></div>`

            for(let i=0; i<positionCarteRetoune.length; i++){
                if(positionCarteRetoune[i] === x*tailleGrille+y){
                    card[positionCarteRetoune[i]].innerHTML = `<img src="${pairesGame[x*tailleGrille+y]}" />`
                }
            }
        }
        ligne += '</div>'
        game.innerHTML += ligne
    } 
}

//function qui gére le click sur une carte
function clickTwocarte(x,y){
    let card = document.querySelectorAll('.card')
    carteRoutourne++
    if(carteRoutourne <= 2){
        if(carteRoutourne > 1){
            positionUn = y*tailleGrille+x
            card[positionUn].innerHTML = `<img src="${pairesGame[positionUn]}" />`

            setTimeout(()=>{
                peuJouer = false
                carteUnEtDeuxidentique = estIdentique(positionUn,positionDeux)
                if(carteUnEtDeuxidentique) {positionCarteRetoune.push(positionUn); positionCarteRetoune.push(positionDeux)}
                else{card[positionUn].innerHTML = `<span>Afficher</span>`; card[positionDeux].innerHTML = `<span>Afficher</span>`}
                carteRoutourne = 0
                positionUn = undefined
                positionDeux = undefined
            }, 3000)
            peuJouer = true
            
        }else{
            positionDeux = y*tailleGrille+x 
            card[positionDeux].innerHTML = `<img src="${pairesGame[positionDeux]}" />`
        }
    }
}
//permet de vérifier si deux cartes sont identique
function estIdentique(positionUn,positionDeux){
    let carteIdentique = false
    //verifier si les cartes sont identiques
    if(pairesGame[positionUn] === pairesGame[positionDeux]){
        carteIdentique = true
    }
    return carteIdentique
}

//start//
function startGame(){
    createTabPairesGame()
    pairesGame = shuffleTab(pairesGame)
    createCarteInPage()
    peuJouer = true
}

startGame()

