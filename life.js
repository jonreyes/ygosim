function Life(){
    this.x = 0;
    this.y = 0;
    this.points = 8000;
    this.width;
    this.color = 'rgb(255,255,255)';
    this.meter = new LifeBar();
    this.selected = false;
    this.drawText = (x,y) => {
        ctx.fillStyle = this.color;
        ctx.font = "30px Verdana";
        this.width = ctx.measureText(this.points).width;
        this.x = x;
        this.y = y;
        ctx.fillText(this.points,this.x-this.width-10,this.y);          
    }
    this.select = () => {
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'rgb(255,255,255)';
        ctx.strokeRect(this.meter.x,this.meter.y,this.meter.width,this.meter.height);
    }
    this.draw = () => {
        if(this.selected == false){
            ctx.lineWidth = 5;
            ctx.strokeStyle = 'rgb(255,0,0)';
            ctx.strokeRect(this.meter.x,this.meter.y,this.meter.width,this.meter.height);
        }
        this.meter.draw(this.meter.x,this.meter.y);
        this.drawText(this.x,this.y);
        if(this.selected == true){
            this.select();
        }
    }
    this.update = (mod) => {
        this.points += mod;
        //console.log(this.points);
        this.draw();
    }
    
}