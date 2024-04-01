const lifeList = [[]];
const decayRate = 0.01; // Adjust the decay rate as needed
const cutoffRate = 2; //Cutoff for hexagon decay
const initialLife = 0; // Initial life value for hexagons
var minLife = 0.5;

var canvas = document.getElementById("hex_canvas");
var header = document.getElementById("header");

//offset to not overlap the header
var headerOffset = header.offsetHeight;
var pageHeight = document.body.offsetHeight - headerOffset;

var projectHex = document.getElementsByClassName('hexGrow')[0];

var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = pageHeight;

let hexSide = canvas.width/40;
let influenceRadiusSq = Math.pow((6*hexSide),2); // Radius of influence around the mouse

let mouseX = 10000;
let mouseY = 10000;
let scroll = -headerOffset;

setScreen();

window.addEventListener("scroll", (event) => {
    scroll = this.scrollY - headerOffset;
});
window.addEventListener('resize', function(event) {

    // Code to handle screen resolution change
    canvas.width = window.innerWidth;
    canvas.height = pageHeight;
    hexSide = canvas.width/40;
    influenceRadiusSq = Math.pow((6*hexSide),2);
    setScreen

});

function setScreen(){
    //offset to not overlap header
    headerOffset = header.offsetHeight;
    pageHeight = document.body.offsetHeight - headerOffset + projectHex.offsetHeight;
    canvas.style.top = headerOffset+ "px";
    canvas.style.height = pageHeight + "px";

    canvas.width = window.innerWidth;
    canvas.height = pageHeight;
    hexSide = canvas.width/40;
    influenceRadiusSq = Math.pow((6*hexSide),2);
}


function drawHexagon(x, y, life) {
    if (life <= 0) return;
    // x, y is center
    ctx.strokeStyle = colorInterpolate('#F9F5E0', '#F7B895', life);
    ctx.lineWidth = hexSide/20;
    ctx.beginPath();
    ctx.moveTo(x - hexSide / 2, y + hexSide * 0.866);
    ctx.lineTo(x - hexSide, y);
    ctx.lineTo(x - hexSide / 2, y - hexSide * 0.866);
    ctx.lineTo(x + hexSide / 2, y - hexSide * 0.866);
    ctx.lineTo(x + hexSide, y);
    ctx.lineTo(x + hexSide / 2, y + hexSide * 0.866);
    ctx.closePath();
    ctx.stroke();
}

function drawHexGrid(originX, originY) {
    setScreen();
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    for (var x = 0; x < canvas.width / (1.5 * hexSide); x++) {
        var offset = x % 2 * 0.866 * hexSide;
        if (lifeList[x] == undefined) {
            lifeList[x] = [];
        }
        for (var y = 0; y < pageHeight / (1.73 * hexSide); y++) {

            if (lifeList[x][y] == undefined) {
                lifeList[x][y] = initialLife // Initialize life value
            }

            // Update life value based on mouse position
            let pos = [originX + 1.5 * hexSide * x,
                originY + 1.73 * hexSide * y + offset]
            let distanceSq = Math.pow(pos[0] - mouseX, 2) + Math.pow((pos[1]+offset) - mouseY, 2);

            let saturation = (influenceRadiusSq-cutoffRate*distanceSq)/influenceRadiusSq;
            if(saturation > 1)saturation = 1;
            //dont accidentally decriment
            lifeList[x][y] = Math.max(saturation,lifeList[x][y]);
            
            // Decrement life value by decay rate
            lifeList[x][y] = Math.max(lifeList[x][y]-decayRate, minLife);
            // Ensure life doesn't go below 0
            lifeList[x][y] = Math.max(0, lifeList[x][y]);
            
            

            drawHexagon(pos[0],pos[1], lifeList[x][y]);
        }
    }
    
    requestAnimationFrame(() => drawHexGrid(originX, originY)); // Call drawHexGrid again for the next frame
}

function colorInterpolate(color1, color2, percent) {
    // Convert the hex colors to RGB values
    const r1 = parseInt(color1.substring(1, 3), 16);
    const g1 = parseInt(color1.substring(3, 5), 16);
    const b1 = parseInt(color1.substring(5, 7), 16);

    const r2 = parseInt(color2.substring(1, 3), 16);
    const g2 = parseInt(color2.substring(3, 5), 16);
    const b2 = parseInt(color2.substring(5, 7), 16);

    // Interpolate the RGB values based on the percentage
    const r = Math.round(r1 + (r2 - r1) * percent);
    const g = Math.round(g1 + (g2 - g1) * percent);
    const b = Math.round(b1 + (b2 - b1) * percent);

    // Convert the interpolated RGB values back to a hex color
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
var wavePos = 0;

function openAnimation(){
    setScreen();
    for (var x = 0; x < canvas.width / (1.5 * hexSide); x++) {
        if (lifeList[x] == undefined) {
            lifeList[x] = [];
        }
        for (var y = 0; y < canvas.height / (1.73 * hexSide); y++) {

            let dist = Math.abs(y-wavePos);
            let saturation = 1 - dist*cutoffRate*0.1;
            if(saturation > 1)saturation = 1;
            if(lifeList[x][y] != undefined){
                lifeList[x][y] = Math.max(lifeList[x][y],saturation)
            }
            else{
                lifeList[x][y] = saturation
            }
            

        }
    }
    wavePos+= 3/hexSide;
    if(wavePos<20){
        requestAnimationFrame(() => openAnimation()); // Call drawHexGrid again for the next frame
    }
}
openAnimation();
drawHexGrid(0, 0);
