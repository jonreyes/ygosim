function Zone(){
    this.x = 0;
    this.y = 0;
    this.color = 'rgb(255,255,255)'
    this.draw = (x,y) => {
        this.x = x;
        this.y = y;
        ctx.strokeStyle = this.color;
        ctx.strokeRect(this.x,this.y,card_height/2,card_height/2);          
    }
}