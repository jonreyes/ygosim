const lifemod = document.getElementById('LifeMod');
lifemod.style.position = "absolute";
lifemod.style.top = height/2-scale/2-10;
lifemod.style.left = width/2-scale-4;
lifemod.style.height = card_height/8;
lifemod.style.width = card_height/2;
const lifemod_add = document.getElementById('LifeModAdd');
lifemod_add.style.position = "absolute";
lifemod_add.style.top = height/2-scale/2+card_height/8+5;
lifemod_add.style.left = width/2-scale-4;
lifemod_add.style.width = card_height/4;
lifemod_add.onclick = () => {
    let mod = parseInt(lifemod.value);
    player_life.update(mod);
}
const lifemod_sub = document.getElementById('LifeModSub');
lifemod_sub.style.position = "absolute";
lifemod_sub.style.top = height/2-scale/2+card_height/8+5;
lifemod_sub.style.left = width/2-scale+card_height/4-4;
lifemod_sub.style.width = card_height/4;
lifemod_sub.onclick = () => {
    let mod = -1*parseInt(lifemod.value);
    player_life.update(mod);
}
