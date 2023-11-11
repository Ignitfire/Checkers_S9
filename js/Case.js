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
        let x= this.x;
        let y= this.y;
        return (x>0 && y>0) ? {x: x - 1, y: y - 1} : null;
    }
    getUpRight() {
        let x= this.x;
        let y= this.y;
        return (x>0 && y<9) ? {x: x - 1, y: y + 1} : null;
    }

    getDownLeft() {
        let x= this.x;
        let y= this.y;
        return (x<9 && y>0) ? {x: x + 1, y: y - 1} : null;
    }

    getDownRight() {
        let x= this.x;
        let y= this.y;
        return (x<9 && y<9) ? {x: x + 1, y: y + 1} : null;
    }
}