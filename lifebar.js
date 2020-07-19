function LifeBar(){
    this.x = 0;
    this.y = 0;
    this.color = 'rgb(255,0,0)';
    this.draw = (x,y) =>{
        this.x = x;
        this.y = y;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x,this.y,scale*8,scale);
    }
}