function Card(random){
    this.x = 0;
    this.y = 0;
    this.data;
    this.scale = 1;
    this.width = card_width*this.scale;
    this.height = card_height*this.scale;
    this.image = new Image();
    this.image.onload = () => {
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    }
    if (random){
    fetch("https://db.ygoprodeck.com/api/v7/randomcard.php")
    .then(response => response.json())
    .then(data => {
        this.data = data;
        this.image.src = data["card_images"][0]["image_url"]
    });
    }
    this.draw = (x,y) => {
        this.x = x;
        this.y = y;
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    }
    this.update = (data) => {
        this.data = data;
        this.image.src = data["card_images"][0]["image_url"];
    }
    this.resize = (scale) =>{
        this.scale = scale;
        this.width = card_width*this.scale;
        this.height = card_height*this.scale;
    }
}