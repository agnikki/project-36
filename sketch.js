//Create variables here
var dog, dog_img, happyDog, database, foodStock, foodS = 0;
var foodObj, feedDog, addFood, fedTime, lastFed;
var changingGameState, readState, currentTime;
function preload() {
  bedroom = loadImage("Bed Room.png");
  deaddog = loadImage("deadDog.png");
  dogvaccination = loadImage("dogVaccination.png");
  FoodStock = loadImage("Food Stock.png");
  garden = loadImage("Garden.png");
  happy = loadImage("Happy.png");
  injection = loadImage("Injection.png");
  lazy = loadImage("Lazy.png");
  livingroom = loadImage("Living Room.png");
  milk = loadImage("milk.png");
  running = loadImage("running.png");
  runningleft = loadImage("runningLeft.png");
  vaccination = loadImage("Vaccination.png");
  washroom = loadImage("Wash Room.png");
  dog_img = loadImage("Dog.png");
  happyDog = loadImage("happy dog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  dog = createSprite(200, 300, 10, 10);
  dog.addImage(dog_img);
  dog.scale = 0.1;

  foodObj = new Food();
  foodStock = database.ref('food');
  foodStock.on("value", (data) => {
    foodS = data.val();
  });
  //function to update food stock and last fed time
  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

  feed = createButton("Feed the dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  readState=database.ref('gameState');
  readState.on("value",function(data) {
    gameState=data.val();
  });
}


function draw() {
  background(46, 139, 87);

  
  fedTime = database.ref('FeedTime');
  fedTime.on("value", function (data) {
    lastFed = data.val();
  });

  if (gameState != "Hungry") {
    feed.hide();
    addFood.hide();
    dog.remove();
  } else {
    feed.show();
    addFood.show();
    dog.addImage(lazy);
  }


  if (currentTime == (lastFed + 1)) {
    update("Playing");
    foodObj.garden();  
  } else  if (currentTime == (lastFed + 2)) {
    update("Sleeping");
    foodObj.bedroom(); 
  } else  if (currentTime >(lastFed + 2) && currentTime<(lastFed + 4)) {
    update("Bathing");
    foodObj.washroom(); 
  } else{
    update("Hungry")
    foodObj.display();
  }
  drawSprites();
  //add styles here
  stroke("black");
  textSize(20);
  //text("foodStock:"+ foodS, 200,100);

  //text("Note:Press up arrow key to feed dog milk!",100,50);

}
function writeStock(x) {
  if (x <= 0) {
    x = 0
  }
  else { x = x - 1 }
  database.ref('/').update({
    food:x
  })
}

//function to add food in stock
function addFoods() {
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}
function feedDog() {
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodS--);
  database.ref('/').update({
    food:foodS,
    FeedTime:hour()
  })
}

function update(state) {
  database.ref('/').update({
    gameState:state
  });
}


