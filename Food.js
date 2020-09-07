class Food{
    constructor(){
        this.image=loadImage("js/Milk.png");
        this.foodStock=0;
        this.lastFed;
    }

       getFoodStock(){
        var getFoodStockRef=database.ref('food');
        getFoodStockRef.on("value",(data)=>{
            this.foodStock=data.val();
        })
       }
       updateFoodStock(z){
           database.ref('/').update({
              food:z
           })
       }

       bedroom(){
           background(bedroom,550,500);
       }
       garden(){
           background(garden,550,500);
       }
       washroom(){
           background(washroom,550,500);
        }
        livingroom(){
            background(livingroom,550,500)
        }
      /* deductFood(){
           var deductFoodRef= database.ref('food');
           deductFoodRef.on("value",(data)=>{
            deductFoodRef=data.val();
           })
       }*/
   
        display(){
            
            var x=80,y=100;

            imageMode(CENTER);
            image(this.image,720,220,70,70);
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
            fill(255,255,554);
            textSize(15);
            if(lastFed>=12){
                text("Last Feed: "+ lastFed%12 + "PM", 350,30);
            }else if(lastFed==0){
                text("Last Feed : 12 AM",350,30)
            }else{
                text("Last Feed : "+ lastFed + "AM", 350,30);
            }
        }
}
  
