class Food{
    constructor(){
        
        this.foodStock=0;
        this.lastFed;
        this.image=loadImage("js/Milk.png");
    }

    updateFoodStock(foodStock){
        this.foodStock=foodStock;
    }

    deductFood(){
        if(this.foodStock>0){
            this.foodStock=this.foodStock-1;
        }
    }
       getFoodStock(){
        return this.foodStock;
       }
      

       // livingroom(){
           // background(livingroomI,550,500)
       // }
      /* deductFood(){
           var deductFoodRef= database.ref('food');
           deductFoodRef.on("value",(data)=>{
            deductFoodRef=data.val();
           })
       }*/
   
        display(){
            background(46, 139, 87);
      fill(255,255,254)       
  textSize(15);
  if(lastFed>=12){
      text("Last Feed: "+ lastFed%12 + "PM", 350,30);
  }else if(lastFed==0){
      text("Last Feed : 12 AM",350,30)
  }else{
      text("Last Feed : "+ lastFed + "AM", 350,30);
  }
            var x=80,y=100;

            imageMode(CENTER);
            if (this.foodStock!=0){
                for(var i=0;i<this.foodStock;i++){
                    if(i%10==0){
                        x=80;
                        y=y+50                
                     }
                     image(this.image,x,y,50,50);
                     x=x+30
                }
            }
        }
            


bedroom(){
    background(bedroomI,550,500);
}
garden(){
    background(gardenI,550,500);
}
washroom(){
    background(washroomI,550,500);
 }
}
