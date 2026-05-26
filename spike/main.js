const canvas = document.getElementById('world');
const ctx = canvas.getContext('2d');

class grub{ //Grub characteristics
    constructor(x, vx, y, vy, hunger, dead, hasReproduced, speed=2, sight=40){
        this.x = x;
        this.vx=vx;
        this.y = y;
        this.vy = vy;
        this.hunger = hunger;
        this.dead = dead;
        this.hasReproduced = hasReproduced;
        this.speed = speed;
        this.sight = sight;
    }
}
class food{ // food
    constructor(x, y, isEaten) {
        this.x = x;
        this.y = y;
        this.isEaten = isEaten;
    }
}
let grubs = []; // array of grubs
for (let i = 0; i < 20; i++) {
    grubs.push(new grub(Math.random()*canvas.width, Math.random()*4-2, Math.random()*canvas.height, Math.random()*4-2, 100, false, false))
}
let foods = []; // array of foods
for (let i = 0; i < 200; i++) {
    foods.push(new food(Math.random()*canvas.width, Math.random()*canvas.height, false))
}
let newborns = [];
function loop() { // main loop that renders
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    grubs.forEach(c => { // iterates throught every grub
        ctx.beginPath();
        ctx.arc(
            c.x,
            c.y,
            c.sight,
            0,
            Math.PI * 2
        );
        ctx.strokeStyle = "hsla(255, 50%, 50%, 0.15)";
        ctx.stroke();

        ctx.beginPath();
        ctx.arc( // draw grub
            c.x,
            c.y,
            10,
            0,
            Math.PI * 2
        );
        let hue = (c.speed / 4) * 240;
        ctx.fillStyle = `hsl(${hue}, 80%, 40%)`;
        ctx.fill();

        c.x += c.vx; // update position
        c.y += c.vy;
        c.hunger -= 2; // decrease hunger

    if (c.hunger <= 0) { // dead flag
        c.dead = true;
        }

    // bounce off walls
    if (c.x >= canvas.width) {
        c.vx*=-1;
    }
    if (c.x <= 0) {
        c.vx*=-1;
    }
    if (c.y >= canvas.height) {
        c.vy*=-1;
    }
    if (c.y <= 0) {
        c.vy*=-1;
        }
        
// find nearest food
        let nearest = null;
        let minDist = Infinity;

    foods.forEach(f => { // iterates through each food
        let dist = Math.sqrt((c.x - f.x) ** 2 + (c.y - f.y) ** 2);
        if (dist < minDist && dist<c.sight) {
            minDist = dist;
            nearest = f; // for each grub checks the nearest food
        }
    });
        // Collision
        if (minDist < 14 && c.hunger < 75) { // hunger++
            c.hasReproduced = false;
            nearest.isEaten = true;
            c.hunger = Math.min(100, c.hunger + 20);
            if (foods.length<=200) {
            foods.push(new food(Math.random()*canvas.width, Math.random()*canvas.height))
        }
    }
        // Reprodruction
        let crowdingFactor = 100;
        let childSpeed = c.speed + (Math.random() * 0.4 - 0.2);
        let childSight = c.sight + (Math.random() * 10 - 5);
        if (nearest && c.hunger > 75 && !c.hasReproduced && grubs.length <= crowdingFactor) {
            console.log("baby born, parent hunger:", c.hunger, "total grubs:", grubs.length);
            let baby = new grub(c.x, Math.random() * 4 - 2, c.y, Math.random() * 4 - 2, 100, false, false, childSpeed, childSight);
            newborns.push(baby);
            c.hasReproduced = true;
        }
 // strear the grub to the nearest food
        else if (nearest && c.hunger <= 75) {
            let distX = nearest.x - c.x;
            let distY = nearest.y - c.y;
            let length = Math.sqrt(distX ** 2 + distY ** 2);
            c.vx = (distX / length) * c.speed;
            c.vy = (distY / length) * c.speed;
        }
    }); // end of grub iteration loop

    grubs = grubs.filter(c => !c.dead).concat(newborns);
    newborns = []
    foods = foods.filter(f => !f.isEaten);

    foods.forEach(f => { // draw food
        ctx.beginPath();
        ctx.arc(
            f.x,
            f.y,
            4,
            0,
            Math.PI*2
        );
        ctx.fillStyle = "red";
        ctx.fill();
    });
    ctx.font = "16px monospace";
    ctx.fillStyle = "black";
    ctx.fillText("Grubs: " + grubs.length, 10, 20);
    ctx.fillText("Food:  " + foods.length, 10, 40);
    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);


