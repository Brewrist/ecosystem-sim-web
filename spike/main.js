const canvas = document.getElementById('world');
const ctx = canvas.getContext('2D');

ctx.beginPath();
ctx.arc(
    200,
    150,
    50,
    0,
    Math.PI * 2
);

ctx.fill();
console.log("Js is workding");