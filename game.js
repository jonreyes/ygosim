
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
const zones = []
let zone = new Zone();
let zone_selected = false;
let selected_zone;
let selected_zone_highlight = new HighLight('rgb(255,0,0)',zone.width,zone.height);
let zone_highlight = new HighLight('rgb(255,255,0)',zone.width,zone.height);
let highlight_zone;
const cards = []
const player_cards = [];
const opponent_cards = [];
let card_selected = false;
let selected_card;
let selected_view;
const place = document.getElementById('Play');
let card_highlight = new HighLight('rgb(255,255,0)',card_width,card_height);
let selected_card_highlight = new HighLight('rgb(255,0,0)',card_width,card_height);
let highlight_card;
background.draw();
opponent_life.meter.draw(width-scale*8,0);
opponent_life.drawText(width,3*scale/4);
player_life.meter.draw(width-scale*8,height-scale);
player_life.drawText(width,height-scale/4);
let pmod = true;
player_life.selected = true;
player_life.select();
//grid.draw();
for(let i = 0; i < 7; i++){
    zone = new Zone();
    zone.draw(width/2-7*card_height/4+i*card_height/2,height/2-5*card_height/4);
    zones.push(zone);
    zone = new Zone();
    zone.draw(width/2-7*card_height/4+i*card_height/2,height/2-3*card_height/4);
    zones.push(zone);
    if(i==0||i==6){
        zone = new Zone();
        zone.draw(width/2-7*card_height/4+i*card_height/2,height/2-card_height/4);
        zones.push(zone);
    }
    zone = new Zone();
    zone.draw(width/2-7*card_height/4+i*card_height/2,height/2+card_height/4);
    zones.push(zone);
    zone = new Zone();
    zone.draw(width/2-7*card_height/4+i*card_height/2,height/2+3*card_height/4);
    zones.push(zone);
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
    if(selected_zone!=null){
    if(event.x >= selected_zone.x && event.x <=selected_zone.x+selected_zone.width && event.y >= selected_zone.y && event.y <=selected_zone.y+selected_zone.height){
    } else {
        // HighLight New Zone
        ctx.fillStyle = 'rgb(0,0,0)';
        ctx.fillRect(selected_zone.x-5,selected_zone.y-5,zone.width+10,zone.height+10)
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgb(255,255,255)';
        ctx.strokeRect(selected_zone.x,selected_zone.y,zone.width,zone.height);
        zone_selected = false;
        selected_zone = null;
    }
    }
    zones.forEach((zone)=>{
        if(event.x >= zone.x && event.x <=zone.x+zone.width && event.y >= zone.y && event.y <=zone.y+zone.height){
                if(zone_selected){
                    zone_selected = false
                    selected_zone = null;
                    ctx.fillStyle = 'rgb(0,0,0)';
                        ctx.fillRect(selected_zone.x-5,selected_zone.y-5,zone.width+10,zone.height+10)
                        ctx.lineWidth = 1;
                        ctx.strokeStyle = 'rgb(255,255,255)';
                        ctx.strokeRect(selected_zone.x,selected_zone.y,zone.width,zone.height);
                }
                zone_selected = true;
                selected_zone = zone;
                // HighLight Selected
                selected_zone_highlight.update(zone.x,zone.y);
                selected_zone_highlight.draw();
                // Update View
                if(zone.card.data!=null){
                    selected_view = new Card(false);
                    selected_view.resize(2);
                    selected_view.update(zone.card.data);
                    // Show Placement
                    place.innerText = "Remove";
                    if(place.style.display == "none"){
                        place.style.display = "block";
                    }
                    place.style.position = "absolute";
                    place.style.top = selected_view.height;
                    place.style.width = selected_view.width;
                    place.style.height = scale;
                    // Remove Card from Zone
                    place.onclick = () => {
                        place.style.display = "none";
                        selected_zone.reset();
                        ctx.fillStyle = 'rgb(0,0,0)';
                        ctx.fillRect(selected_zone.x-5,selected_zone.y-5,zone.width+10,zone.height+10)
                        ctx.lineWidth = 1;
                        ctx.strokeStyle = 'rgb(255,255,255)';
                        ctx.strokeRect(selected_zone.x,selected_zone.y,zone.width,zone.height);                        }
                    }
        }
    });
    cards.forEach((card)=>{
        if (event.x >= card.x && event.x <= card.x+card_width && event.y>=card.y && event.y <= card.y+card_height){
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
                    card_selected = true;
                } 
                // On Same Card Selection Flip Selection
                if(card == selected_card){ 
                    card_selected = card_selected ^ true;
                    // On Deselect Clear View Selection
                    if(card_selected == false){
                        ctx.fillStyle = 'rgb(0,0,0)'
                        ctx.fillRect(selected_view.x,selected_view.y,selected_view.width,selected_view.height+1);
                        selected_card = null;
                        place.style.display = "none";
                    }
                }
                if(!card_selected){
                    selected_card = null;
                } else {
                //console.log((selected)?"selected":"not selected");
                // Update Selected Card
                selected_card = card;
                // HighLight Selected
                selected_card_highlight.update(card.x,card.y);
                selected_card_highlight.draw();
                // Update Selected View
                selected_view = new Card(false);
                selected_view.resize(2);
                selected_view.update(card.data);
                //console.log(selected_card.data["name"]);
                // Show Placement
                if(place.innerText=="Remove"){
                    place.innerText = "Play";
                }
                if(place.style.display=="none"){
                    place.style.display = "block";
                }
                place.style.position = "absolute";
                place.style.top = selected_view.height;
                place.style.width = selected_view.width;
                place.style.height = scale;
                place.onclick = () => {
                    place.style.display = "none";
                    selected_zone.card.update(selected_card.data);
                }
                }
        }
    });
},false);
canvas.addEventListener("mousemove",event =>{
    if(highlight_zone!=null){
        if(event.x >= zone.x && event.x <=zone.x+zone.width && event.y >= zone.y && event.y <=zone.y+zone.height){
        } else {
            // Clear Previous Zone
            ctx.fillStyle = 'rgb(0,0,0)';
            ctx.fillRect(highlight_zone.x-5,highlight_zone.y-5,zone.width+10,zone.height+10);
            highlight_zone.card.draw(highlight_zone.x+highlight_zone.width/2-highlight_zone.card.width/2,highlight_zone.y);
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgb(255,255,255)';
            ctx.strokeRect(highlight_zone.x,highlight_zone.y,zone.width,zone.height);
            highlight_zone = null;
        }
    }
    zones.forEach((zone) => {
        if(event.x >= zone.x && event.x <=zone.x+zone.width && event.y >= zone.y && event.y <=zone.y+zone.height){
            // HighLight Current
            highlight_zone = zone;
            zone_highlight.update(zone.x,zone.y);
            zone_highlight.draw(); 
        }
        if(selected_zone!=null){
            selected_zone_highlight.draw();
        }
    })
    if(highlight_card!=null){
    if (event.x >= highlight_card.x && event.x <= highlight_card.x+card_width && event.y>=highlight_card.y && event.y <= highlight_card.y+card_height){
        //console.log(event.x,event.y,"highlight");
    } else{
        // Clear Previous HighLight
        ctx.fillStyle = 'rgb(0,0,0)'
        ctx.fillRect(highlight_card.x-5,highlight_card.y-5,card_width+10,card_height+10)
        highlight_card.draw(highlight_card.x,highlight_card.y);
        highlight_card = null;
        //console.log(event.x,event.y,"no highlight");
    }
    }
    cards.forEach((card)=>{
        if (event.x >= card.x && event.x <= card.x+card_width){
            if(event.y>=card.y && event.y <= card.y+card_height){
                // HighLight Current
                highlight_card = card;
                card_highlight.update(card.x,card.y);
                card_highlight.draw();
            }
        }
        if(selected_card!=null){
            selected_card_highlight.draw();
        }
    });
},false)

