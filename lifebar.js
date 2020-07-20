function LifeBar(){
    this.x = 0;
    this.y = 0;
    this.width = scale*8;
    this.height = scale;
    this.color = 'rgb(255,0,0)';
    this.draw = (x,y) =>{
        this.x = x;
        this.y = y;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }
}