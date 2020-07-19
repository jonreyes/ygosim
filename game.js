
const canvas = document.getElementById('Game');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;
let scale = 40;
const ctx = canvas.getContext('2d');
const background = new Background();
const player_life = new Life();
const player_life_bar = new LifeBar();
const opponent_life = new Life();
const opponent_life_bar = new LifeBar();
const grid = new Grid();
const zone = new Zone();
const cards = []
const player_cards = [];
const opponent_cards = [];
let selected = false;
let selected_card;
let selected_view;
let highlight = new HighLight('rgb(255,255,0)');
let selected_highlight = new HighLight('rgb(255,0,0)');
let highlight_card;
background.draw();
opponent_life.meter.draw(width-scale*8,0);
opponent_life.draw(width,3*scale/4);
player_life.meter.draw(width-scale*8,height-scale);
player_life.draw(width,height-scale/4);
//grid.draw();
for(let i = 0; i < 7; i++){
    const zone = new Zone();
    zone.draw(width/2-7*card_height/4+i*card_height/2,height/2-5*card_height/4);
    zone.draw(width/2-7*card_height/4+i*card_height/2,height/2-3*card_height/4);
    if(i==0||i==6){
        zone.draw(width/2-7*card_height/4+i*card_height/2,height/2-card_height/4);
    }
    zone.draw(width/2-7*card_height/4+i*card_height/2,height/2+card_height/4);
    zone.draw(width/2-7*card_height/4+i*card_height/2,height/2+3*card_height/4);
}
for(let i = 0; i < 5; i++){
    const card = new Card(true);
    card.draw(width/2-5*card_width/2-scale+i*card_width+i*scale/2,0-card_height/2);
    opponent_cards.push(card);
    cards.push(card);
}
for(let i = 0; i < 5; i++){
    const card = new Card(true);
    card.draw(width/2-5*card_width/2-scale+i*card_width+i*scale/2,height-card_height/2);
    player_cards.push(card);
    cards.push(card);
}
canvas.addEventListener("click",event => {
    cards.forEach((card)=>{
        if (event.x >= card.x && event.x <= card.x+card_width){
            if(event.y>=card.y && event.y <= card.y+card_height){
                // Clear Previous Selection
                if(selected_card!=null){
                    ctx.fillStyle = 'rgb(0,0,0)'
                    ctx.fillRect(selected_card.x-5,selected_card.y-5,card_width+10,card_height+10)
                    c = new Card(false);
                    c.x = selected_card.x;
                    c.y = selected_card.y;
                    c.update(selected_card.data);
                } 
                // Selection After No Selection
                if(selected_card==null){
                    selected = true;
                } 
                // On Same Card Selection Flip Selection
                if(card == selected_card){ 
                    selected = selected ^ true;
                    // On Deselect Clear View Selection
                    if(selected == false){
                        ctx.fillStyle = 'rgb(0,0,0)'
                        ctx.fillRect(selected_view.x,selected_view.y,card_width*selected_view.scale,card_height*selected_view.scale);
                    }
                }
                if(!selected){
                    selected_card = null;
                } else {
                //console.log((selected)?"selected":"not selected");
                // Update Selected Card
                selected_card = card;
                // HighLight Selected
                selected_highlight.update(card.x,card.y);
                selected_highlight.draw();
                // Update Selected View
                selected_view = new Card(false);
                selected_view.scale = 2;
                selected_view.update(card.data);
                console.log(selected_card.data["name"]);
                }
            }
        }
    });
},false);
canvas.addEventListener("mousemove",event =>{
    if(highlight_card!=null){
    if (event.x >= highlight_card.x && event.x <= highlight_card.x+card_width && event.y>=highlight_card.y && event.y <= highlight_card.y+card_height){
        //console.log(event.x,event.y,"highlight");
    } else{
        ctx.fillStyle = 'rgb(0,0,0)'
        ctx.fillRect(highlight_card.x-5,highlight_card.y-5,card_width+10,card_height+10)
        c = new Card(false);
        c.x = highlight_card.x;
        c.y = highlight_card.y;
        c.update(highlight_card.data);
        highlight_card = null;
        //console.log(event.x,event.y,"no highlight");
    }
    }
    cards.forEach((card)=>{
        if (event.x >= card.x && event.x <= card.x+card_width){
            if(event.y>=card.y && event.y <= card.y+card_height){
                // HighLight Current
                highlight_card = card;
                highlight.update(card.x,card.y);
                highlight.draw();
            }
        }
        if(selected_card!=null){
            selected_highlight.draw();
        }
    });
},false)

