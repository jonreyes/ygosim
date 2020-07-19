function Life(){
    this.x = 0;
    this.y = 0;
    this.points = 8000;
    this.width;
    this.color = 'rgb(255,255,255)';
    this.meter = new LifeBar();
    this.draw = (x,y) => {
        this.x = x;
        this.y = y;
        ctx.fillStyle = this.color;
        ctx.font = "30px Verdana";
        this.width = ctx.measureText(this.points).width;
        ctx.fillText(this.points,this.x-this.width,this.y);          
    }
    this.update = (mod) => {
        this.points += mod;
        console.log(this.points);
        ctx.fillStyle = 'rgb(255,0,0)';
        ctx.fillRect(this.x-this.width,this.y-3*scale/4,this.width,scale);
        this.draw(this.x,this.y);
    }
}