let canvas;
let context;

var gridX = 0;
var gridY = 0;

//grid shape
var numHorizontalLines = 10;
var numVerticalLines = 10;
var lineSpacing = 60;

var colorPallete = Array('red','green','blue','yellow');
var mapColors = Array();
for(i = 0; i <= numHorizontalLines; i++){
    let row = Array();
    for(j = 0; j <= numVerticalLines; j++){
        let color = colorPallete[Math.floor(Math.random()*4)];
        row.push(color);
    }
    mapColors.push(row);
}

function drawGrid(xOffset,yOffset){
    canvas = document.getElementById('map');
    context = canvas.getContext('2d');

    canvas.width = 400;
    canvas.height = 400;
    
    //styling of lines
    context.lineWidth = 2;

    //current drawing Position
    let xPos = xOffset;
    let yPos = yOffset;

    //generating fields with random colors
    for(i = 0; i <= numHorizontalLines; i++){
        for(j = 0; j <= numVerticalLines; j++){
            context.fillStyle = mapColors[i][j];
            context.fillRect(
                xOffset + i*lineSpacing,
                yOffset + j*lineSpacing,
                lineSpacing,
                lineSpacing
            )
        }
    }

    //make whole vertical lines
    for(let currVerticalLine = 1; currVerticalLine <= numVerticalLines; currVerticalLine++){
        xPos = xOffset+currVerticalLine*lineSpacing;
        context.beginPath();
        context.moveTo(xPos,yOffset)
        context.lineTo(xPos,(1+numHorizontalLines)*lineSpacing+yOffset);
        context.stroke();
    }

    //make whole horizontal lines
    for(let currHorizontalLine = 1; currHorizontalLine <= numHorizontalLines; currHorizontalLine++){
        yPos = yOffset+currHorizontalLine*lineSpacing;
        context.beginPath();
        context.moveTo(xOffset,yPos);
        context.lineTo((1+numVerticalLines)*lineSpacing+xOffset,yPos);
        context.stroke();
    }

    //update position variable of the grid
    gridX = xOffset;
    gridY = yOffset;
}



function makeCanvasDraggable(){
    canvas = document.getElementById('map');
    context = canvas.getContext('2d');

    //get relevant positional/dimensional data about the canvas
    var offsetY = canvas.offsetTop;
    var offsetX = canvas.offsetLeft;
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;

    //state variable
    var isDragging = false;

    //mouse position
    var canMouseX;
    var canMouseY;

    canvas.addEventListener('mousedown',handleMouseDown);
    canvas.addEventListener('mouseup',handleMouseUp);
    canvas.addEventListener('mouseout',handleMouseOut);
    canvas.addEventListener('mousemove',handleMouseMove);

    function handleMouseDown(e){
        canMouseX=parseInt(e.clientX-offsetX)
        canMouseY=parseInt(e.clientY-offsetY);
        // set the drag flag
        isDragging=true;
    }


    function handleMouseUp(e){
        canMouseX=parseInt(e.clientX-offsetX);
        canMouseY=parseInt(e.clientY-offsetY);
        // set the drag flag
        isDragging=false;
    }

    function handleMouseOut(e){
        canMouseX=parseInt(e.clientX-offsetX);
        canMouseY=parseInt(e.clientY-offsetY);
        // user has left the canvas, so clear the drag flag
        isDragging=false;
    }

    function handleMouseMove(e){
        mouseX = parseInt(e.clientX-offsetX);
        mouseY = parseInt(e.clientY-offsetY);
        deltaX = mouseX - canMouseX;
        deltaY = mouseY - canMouseY;
        canMouseX=parseInt(e.clientX-offsetX);
        canMouseY=parseInt(e.clientY-offsetY);
        // if the drag flag is set, clear the canvas and draw the grid
        if(isDragging){
            context.clearRect(0,0,canvasWidth,canvasHeight);
            drawGrid(gridX + deltaX,gridY + deltaY);
        }
    }

}

window.addEventListener('load',function(){
    drawGrid(0,0);
    makeCanvasDraggable();
},false);
