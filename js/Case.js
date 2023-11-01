export default class Case {
 name;
 x;
 y;
 pion;


 constructor(x,y,pion){
    this.name = "Case"+x+y;
        this.x = x;
        this.y = y;
        this.pion = pion;

 }

    hasPawn(){
            return this.pion != null;
     }    
    getUpLeft() {
        return (this.x>0 && this.y>0) ? {x: this.x - 1, y: this.y - 1} : null;
    }
    getUpRight() {
        return (this.x<9 && this.y>0) ? {x: this.x + 1, y: this.y - 1} : null;
    }

    getDownLeft() {
        return (this.x>0 && this.y<9) ? {x: this.x - 1, y: this.y + 1} : null;
    }

    getDownRight() {
        return (this.x<9 && this.y<9) ? {x: this.x + 1, y: this.y + 1} : null;
    }
}