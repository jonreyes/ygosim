function Card(random){
    this.x = 0;
    this.y = 0;
    this.data;
    this.scale = 1;
    this.image = new Image();
    this.image.onload = () => {
        ctx.drawImage(this.image,this.x,this.y,card_width*this.scale,card_height*this.scale);
    }
    if (random){
    fetch("https://db.ygoprodeck.com/api/v7/randomcard.php")
    .then(response => response.json())
    .then(data => {
        this.data = data;
        this.image.src = data["card_images"][0]["image_url"]
    });
    }
    this.draw = () => {
        ctx.drawImage(this.image,this.x,this.y,card_width*this.scale,card_height*this.scale);
    }
    this.draw = (x,y) => {
        this.x = x;
        this.y = y;
        ctx.drawImage(this.image,this.x,this.y,card_width*this.scale,card_height*this.scale);
    }
    this.update = (data) => {
        this.data = data;
        this.image.src = data["card_images"][0]["image_url"];
    }
}