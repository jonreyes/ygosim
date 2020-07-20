const modamt = document.getElementById('ModAmt');
modamt.style.position = "absolute";
modamt.style.top = height/2-scale/2-20;
modamt.style.left = width/2-scale-4;
modamt.style.height = card_height/8;
modamt.style.width = card_height/2;
const changemod = document.getElementById('ChangeMod');
changemod.style.position = "absolute";
changemod.style.top = height/2-scale/2+10;
changemod.style.left = width/2-scale-4;
changemod.style.height = card_height/8;
changemod.style.width = card_height/2;
changemod.onclick = () => {
    pmod = pmod ^ true;
    if(pmod){
        player_life.select();
        player_life.selected = true;
        opponent_life.selected = false;
        opponent_life.draw();
    } else {
        opponent_life.select();
        opponent_life.selected = true;
        player_life.selected = false;
        player_life.draw();
    }
    // Player ↓
    if(changemod.textContent=="\u2193"){
        changemod.textContent = "\u2191";
    } else {
        // Opponent ↑
        changemod.textContent="\u2193";
    }
}
const life_add = document.getElementById('Add');
life_add.style.position = "absolute";
life_add.style.top = height/2-scale/2+card_height/8+15;
life_add.style.left = width/2-scale-4;
life_add.style.width = card_height/4;
life_add.onclick = () => {
    let mod = parseInt(modamt.value);
    if(pmod){
        player_life.update(mod);
    } else {
        opponent_life.update(mod);
    }
}
const life_sub = document.getElementById('Sub');
life_sub.style.position = "absolute";
life_sub.style.top = height/2-scale/2+card_height/8+15;
life_sub.style.left = width/2-scale+card_height/4-4;
life_sub.style.width = card_height/4;
life_sub.onclick = () => {
    let mod = -1*parseInt(modamt.value);
    if(pmod){
        player_life.update(mod);
    } else {
        opponent_life.update(mod);
    }
}
