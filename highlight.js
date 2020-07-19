function HighLight(color){
    this.x = 0;
    this.y = 0;
    this.color = color;
    this.draw = () => {
        ctx.lineWidth = 5;
        ctx.strokeStyle = this.color;
        ctx.strokeRect(this.x,this.y,card_width,card_height);          
    }
    this.update = (x,y) => {
        this.x = x;
        this.y = y;
    }
}