class Damier {
    /** tableau des cases */
    cases = [];
    pions = [];
    
    /** Dans ce constructeur, le joueur 1 est sytèmatiquement en haut */
    init(){
        this.cases = [];
        White=false;
        for(let i=0; i<10; i++){
            White=!White;
            for(let j=0; j<10; j++){
                if(!White){
                    pion = null;
                    if(i<4){
                        this.pions.push(new Pion(i,j,0));
                    }
                    if(i>5){
                        this.pions.push(new Pion(i,j,1));    
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
}
