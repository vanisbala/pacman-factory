var pos = 0;
const pacArray = [
    ['images/PacMan1.png', 'images/PacMan2.png'],
    ['images/PacMan3.png', 'images/PacMan4.png']
];
var direction = 0;
const pacMen = []; // This array holds all the pacmen
var timer;

function setToRandom(scale) {
    return {
        x: Math.floor(Math.random() * scale),
        y: Math.floor(Math.random() * scale)
    }
}
// Factory to make a PacMan at a random position with random velocity
function makePac() {
    // returns an object with random values

    let velocity = setToRandom(10); 
    let position = setToRandom(200);
    // Add image to div id = game
    let game = document.getElementById('game');   
    let newimg = document.createElement('img');
    newimg.style.position = 'absolute';
    newimg.src = 'images/PacMan1.png';
    newimg.width = 100;
    newimg.left = position.x;
    newimg.top = position.y;
    // add new Child image to game
    game.appendChild(newimg);
    // return details in an object
    return {
        position,
        velocity,
        newimg
    }
}

function update() {
    //loop over pacmen array and move each one and move image in DOM
    pacMen.forEach((item) => {
        checkCollisions(item);
        item.position.x += item.velocity.x;
        item.position.y += item.velocity.y;
        item.newimg.style.left = item.position.x+'px';
        item.newimg.style.top = item.position.y+'px';
    })
    timer = setTimeout(update, 20);
}

function checkCollisions(item) {
    //
    // detect collision with all walls and make pacman bounce
    //

    if(item.position.x+item.velocity.x+item.newimg.width > window.innerWidth){
        item.velocity.x = -item.velocity.x;
        item.newimg.src= pacArray[1][0];
    }
    else if(item.position.x + item.velocity.x < 0){
        item.velocity.x = -item.velocity.x;
        item.newimg.src= pacArray[0][0];
    }
    if(item.position.y+item.velocity.y+item.newimg.height > window.innerHeight || item.position.y + item.velocity.y < 0){
        item.velocity.y= -item.velocity.y;

    }
}
function stop(){
    clearTimeout(timer);
}   


function makeOne() {
   
    pacMen.push(makePac()); // add a new PacMan
}