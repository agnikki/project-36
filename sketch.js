//Create variables here
var dog,dog_img,lazy, happyDog, database,garden,washroom;
var foodStock, foodS;
var currentTime,fedTime, lastFed;
var foodObj;
var feed, addFood;
var gameState, readState;
function preload() {
  bedroomI = loadImage("images/Bed Room.png");
   gardenI = loadImage("images/Garden.png");
  lazy = loadImage("images/Lazy.png");
  livingroomI = loadImage("images/Living Room.png");
    washroomI = loadImage("images/Wash Room.png");
  dog_img = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  foodObj=new Food();
  
  foodStock = database.ref('food');
  foodStock.on("value", readStock);


  fedTime = database.ref('FeedTime');
  fedTime.on("value", function (data) {
    lastFed = data.val();
  });

  dog = createSprite(200, 400,150, 150);
  dog.addImage(dog_img);
  dog.scale = 0.15;

  //function to update food stock and last fed time
  
  feed = createButton("Feed the dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);
  
  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

 

  readState=database.ref('gameState');
  readState.on("value",function(data) {
    gameState=data.val();
  });
}


function draw() {
  background(46, 139, 87);
  currentTime = hour();
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
  

  if (gameState != "Hungry") {
    feed.hide();
    addFood.hide();
    dog.remove();
  } else {
    feed.show();
    addFood.show();
    dog.addImage(lazy);
  }

   drawSprites();

}
  //add styles here
 
  //text("foodStock:"+ foodS, 200,100);

  //text("Note:Press up arrow key to feed dog milk!",100,50);


function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}
function feedDog() {
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour(),
    gameState:"Hungry"
  })
}

function addFoods() {
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}
function update(state) {
  database.ref('/').update({
    gameState:state
  });
}

 /* function writeStock(x) {
  if (x <= 0) {
    x = 0
  }
  else { x = x - 1 }
  database.ref('/').update({
    food:x
  })
}
*/
//function to add food in stock



 
