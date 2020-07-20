function Zone(){
    this.x = 0;
    this.y = 0;
    this.width = card_height/2;
    this.height = card_height/2;
    this.color = 'rgb(255,255,255)';
    this.card = new Card(false);
    this.card.resize(0.5);
    this.card.x = this.x+this.width/2-this.card.width/2;
    this.card.y = this.y;
    this.draw = (x,y) => {
        this.x = x;
        this.y = y;
        this.card.x = this.x+this.width/2-this.card.width/2;
        this.card.y = this.y;
        ctx.lineWidth = 1;
        ctx.strokeStyle = this.color;
        ctx.strokeRect(this.x,this.y,this.width,this.height);  
    }
    this.reset = () => {
        this.card = new Card(false);
        this.card.resize(0.5);
    }
}