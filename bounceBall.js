var myCanvas = document.getElementById("canvas"); 

//Module Aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Body = Matter.Body,
    Bodies = Matter.Bodies,
    Events = Matter.Events,
    MouseConstraint = Matter.MouseConstraint,
    SAT = Matter.SAT;

//Engine and Renderer
var engine = Engine.create(),
    world = engine.world;

var render = Render.create({
    element: document.body,
    engine: engine,
    canvas: myCanvas,
    options: {
        width: 1500,
        height: 700,
        showCollisions: true,
        showConvexHulls: true
    }
});

Render.run(render);
Engine.run(engine); 

//Player ball and game ball
var controllerBall = Bodies.circle(750, 500, 50, {restitution: 1.35}),
    bounceBall = Bodies.circle(750, 100, 10, {isStatic: true});

    
//Walls: Increased thickness to help with collision detection
var roof = Bodies.rectangle(750, -100, 1500, 200, { isStatic: true }),
    floor = Bodies.rectangle(750, 800, 1500, 200, { isStatic: true }),
    leftWall = Bodies.rectangle(-100, 350, 200, 700, { isStatic: true }),
    rightWall = Bodies.rectangle(1600, 350, 200, 700, { isStatic: true });


//Adding bodies to the world
World.add(world, [controllerBall, bounceBall, roof, floor, leftWall,rightWall]);


//Variables
var startTimer = false; 
var secondsBeforeDrag = 0;


engine.world.gravity.y = 0;


Events.on(engine, 'afterUpdate', function(event) {

    //Ball GameOver Collisions 
    const collisionsList = [
        SAT.collides(bounceBall, floor), 
        SAT.collides(bounceBall, roof), 
        SAT.collides(bounceBall, leftWall), 
        SAT.collides(bounceBall, rightWall),
        SAT.collides(controllerBall, floor), 
        SAT.collides(controllerBall, roof), 
        SAT.collides(controllerBall, leftWall), 
        SAT.collides(controllerBall, rightWall)
    ];
    
    var secondsAfterDrag = 0; 
    var minutes = 0; 
    var seconds = 0; 

    if (startTimer){
        secondsAfterDrag = Math.floor(engine.timing.timestamp/1000) - secondsBeforeDrag; 
        minutes = Math.floor(secondsAfterDrag/60); 
        seconds = secondsAfterDrag - (minutes * 60); 
        document.getElementById("timer").innerHTML = seconds < 10 ? minutes.toFixed(0) + ":0" + seconds.toFixed(0) : minutes.toFixed(0) + ":" + seconds.toFixed(0);
     }
     else {
        secondsBeforeDrag = Math.floor(engine.timing.timestamp/1000);
     }

     console.log(seconds); 

     //Check if game ending collision occurs and ends object movement
     collisionsList.forEach(function(collision) {
        if (collision.collided){
            Body.setStatic(bounceBall, true); 
            Body.setStatic(controllerBall, true); 
            startTimer = false; 
        }
     });
});



//Mouse Control
var mouse = MouseConstraint.create(engine, {
        constraint: {
            render: {
                visible: false
            }
        }
    }
);

World.add(world, mouse);



Events.on(mouse, "startdrag", function() { 

    if (mouse.body == controllerBall && !startTimer) {
        startTimer = true; 
        engine.world.gravity.y = 1; 
        Body.setStatic(bounceBall, false); 
    }
});
    
    

    




