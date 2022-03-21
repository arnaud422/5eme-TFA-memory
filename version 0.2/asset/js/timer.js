//classe timeur
class Timeur{

    constructor(tempDemande, quandTimeurFini){
        this.processus = null;
        this.tempRestant = tempDemande ? tempDemande : 120;
        this.quandTimeurFini = quandTimeurFini ? quandTimeurFini : null;
        this.LancerTimeur();
    }

    LancerTimeur(){
        if(this.processus == null){
            this.processus = setInterval(()=>{
                this.ActualiserTimeur();
                console.log(this.tempRestant);
            },1000)
        }
    }

    StopperTimeur(){
        clearInterval(this.processus);
        this.processus = null;
    }

    ActualiserTimeur(){
        if(this.tempRestant > 0){
            this.tempRestant--;
        }
        else{
            this.quandTimeurFini();
            this.StopperTimeur();
        }
    }

}