function HighLight(color,width,height){
    this.x = 0;
    this.y = 0;
    this.color = color;
    this.width = width;
    this.height = height;
    this.draw = () => {
        ctx.lineWidth = 5;
        ctx.strokeStyle = this.color;
        ctx.strokeRect(this.x,this.y,this.width,this.height);          
    }
    this.update = (x,y) => {
        this.x = x;
        this.y = y;
    }
}