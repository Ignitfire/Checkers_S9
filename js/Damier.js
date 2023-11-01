import Case from './Case.js';
import Pion from './Pion.js';
import Joueur from './Joueur.js'; 

export default class Damier {
    /** tableau des cases */
    cases = [];
    pions = [];
    
    /** Dans ce constructeur, le joueur 1 est sytèmatiquement en haut */
    constructor(j1, j2){
        this.cases = [];
        let White=false;
        for(let i=0; i<10; i++){
            White=!White;
            for(let j=0; j<10; j++){
                if(!White){
                    let pion = null;
                    if(i<4){
                        pion=new Pion(i,j,0);
                        this.pions.push(pion);
                        j1.pions.push(pion);
                    }
                    if(i>5){
                        pion=new Pion(i,j,1);
                        this.pions.push(pion);
                        j2.pions.push(pion);
                    }
                    this.cases.push(new Case(i,j,pion));
            }
            White=!White;
        }
    }
}
    getPion(x,y){
        return this.cases.find(c => c.x == x && c.y == y).pion;
    }

    getCase(x,y){
        return this.cases.find(c => c.x == x && c.y == y);
    }
    clearStatus(){
        this.cases.forEach(c => {if(c.status==1) c.status = 0});
    }
}
