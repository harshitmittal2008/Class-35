var ball;
var databaseBall,database,position;

function setup(){
    database = firebase.database();
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "green";
    databaseBall = database.ref('ball/position');
    databaseBall.on("value", readPosition, showError);
}

function draw(){
    background("orange");
    if(keyDown(LEFT_ARROW)){                              
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    database.ref('ball/position').set({
        'x': position.x,
        'y': position.y
    })
}

function readPosition(data)
{
    position = data.val()
    ball.x = position.x;
    ball.y = position.y;
}

function showError()
{
    console.log("data has not been recieved from the database");
}
