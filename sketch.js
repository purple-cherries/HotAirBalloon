var ball;
var database, position;
var balloon, bg;
var balloon2, balloon3;

function preload(){

    bg = loadImage("background.png")
    balloon = loadImage("H-A-B1.png")
    balloon2 = loadImage("H-A-B2.png")
    balloon3 = loadImage("H-A-B3.png")

}

function setup(){
    createCanvas(500,500);
    database = firebase.database()
    ball = createSprite(250,250,10,10);
    ball.addImage("HotAirBalloon", balloon)
 
    ball.scale = 0.35
    ball.shapeColor = "red";

    var ballPosition = database.ref("ball/position");
    ballPosition.on("value",readPosition)
}

function draw(){
    background(bg);
    fill("black")
    text("Use the arrow keys to move the Hot Air Balloon!", 10,30)

    if(position != undefined){


    if(keyDown(LEFT_ARROW)){
        changePosition(-3,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(3,0);
    }
    else if(keyDown(UP_ARROW)){
        ball.addAnimation("HotAirBalloon",balloon, balloon2)
        changePosition(0,-3);
 
        ball.scale = ball.scale - 0.001
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+3);
        ball.scale = ball.scale + 0.001
    }
    drawSprites();
}
}

function changePosition(x,y){
    database.ref("ball/position").set({
        x: position.x +x,
        y: position.y+y
    })
 
}


function readPosition(data){
    position = data.val();
    ball.x = position.x
    ball.y = position.y

}