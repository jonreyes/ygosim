function Background(){
    this.color = 'rgb(0,0,0)'
    this.draw = () => {
        ctx.fillStyle = this.color;
        ctx.fillRect(0,0,width,height);          
    }
}