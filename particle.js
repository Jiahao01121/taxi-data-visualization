
var Particle = function(){
  //0.01667 sec／frame is base on frame rate. eg: 0.01667 * 60 == 1; 0.002237583892617 is base on the projection. our projection enlarge lat lng 7.45 times
  this.particleAgeInterval_speed;

  this.particleAge = 0;
  this.position = createVector(0, 0);

  this.startPoint;
  this.endPoint;
  this.lifeSpanTotal;
  this.distX_direction;
  this.distY_direction;
  this.particleSequence;

  this.passenger_count;
  this.trip_distance;
  this.tip_amount;
  this.total_amount;

  this.particleTransp;

//call config & the arguments are in the sketch.js
this.config(sx,sy,ex,ey,particleSequence,parLife,passenger_count,trip_distance,tip_amount,total_amount);
} //Particle class

Particle.prototype.config = function(SX,SY,EX,EY,PARTICLESQ,PARLIFE,passenger_count,trip_distance,tip_amount,total_amount){
  //Features
  this.passenger_count = + passenger_count + 2
  this.trip_distance = trip_distance;
  this.tip_amount = Math.round(tip_amount);
  this.tips = +tip_amount;
  this.total_amount = total_amount;

  //core
  this.startPoint = createVector(SX,SY);
  this.endPoint = createVector(EX,EY);
  this.particleSequence = PARTICLESQ;
  this.lifeSpanTotal = PARLIFE;
  //direction
  this.distX_direction = this.endPoint.x - this.startPoint.x;
  this.distY_direction = this.endPoint.y - this.startPoint.y;
  //Pythagoras theorem:
  this.hypotenuseLength = Math.sqrt(  (this.distX_direction * this.distX_direction) + (this.distY_direction * this.distY_direction)  );
  this.particleAgeInterval_speed =( ((this.hypotenuseLength /7.45) / this.lifeSpanTotal) / 0.06 ) * 0.000000018 ;  //0.0000000018 is the actrall and the particle dead base on the real time. &&
} //config

Particle.prototype.display = function(){
  //base on GUI
  this.speedBaseOnGui = speedGUI.speed;
  this.particleAge += this.particleAgeInterval_speed * this.speedBaseOnGui;

  if(this.particleAge <= this.lifeSpanTotal/*assessment of particle life*/){
    //update position
    this.position.x = this.startPoint.x + (this.particleAge * this.distX_direction);
    this.position.y = this.startPoint.y + (this.particleAge * this.distY_direction);
/***********************************************************************************************************/
    //根据时间，距离下车时间越远越亮（fade away） but if timeInteval is too small, it gonna be really opsticle all the time.
    if(speedGUI.transparent_base_on_travel){
      //透明度
      this.particleTransp = map(this.lifeSpanTotal - this.particleAge,0,1,0,255);
    }else{
      //透明度
      this.particleTransp = 255;
    }
/***********************************************************************************************************/
    //根据到达位置,显示bar fadeAway
    if(this.particleTransp<7 && !speedGUI.disable){
      //内部定义颜色
      noStroke();
      fill(speedGUI.R_arrive_color,speedGUI.G_arrive_color,speedGUI.B_arrive_color,map(this.particleTransp,7,0,0,200))
      text("|",this.position.x,this.position.y,30,30)
    };
/***********************************************************************************************************/
    //根据小费,显示小费
    if(ballSize.showTips && this.tips > 0){
      //内部定义颜色
      noStroke();
      fill(ballSize.text_R,ballSize.text_G,ballSize.text_B,this.particleTransp);
      text(this.tips,this.position.x+2,this.position.y+2,30,30);
    };
/***********************************************************************************************************/
    //根据小费,显示球的大小
    if(ballSize.showTipsBaseOnSize){
      //ball color
      // stroke(backgroundColor.background);
    noStroke();
    fill(ballColor.ball_R,ballColor.ball_G,ballColor.ball_B,this.particleTransp);
    ellipse(this.position.x,this.position.y, this.tip_amount, this.tip_amount);
  };
/***********************************************************************************************************/
    //根据人数,显示粒子的大小
    if(passenger.amount){
      //ball color
      // stroke(backgroundColor.background);
    noStroke();
    fill(ballColor.ball_R,ballColor.ball_G,ballColor.ball_B,this.particleTransp);
    ellipse(this.position.x, this.position.y, this.passenger_count, this.passenger_count);
    // console.log( typeof this.passenger_count);
    // console.log(this.passenger_count);
    // console.log( typeof this.particleSequence);
    };
/***********************************************************************************************************/
    //无属性，仅显示球大小
    if(!ballSize.showTipsBaseOnSize && !ballSize.showTips && !passenger.amount){
      //ball color
      // stroke(backgroundColor.background);
      noStroke();
      fill(ballColor.ball_R,ballColor.ball_G,ballColor.ball_B,this.particleTransp);
      ellipse(this.position.x,this.position.y,2,2);
    };
/***********************************************************************************************************/
  } //big if assesment
} //display & update
Particle.prototype.isDead = function(){
  if(this.particleAge >= this.lifeSpanTotal){
    console.log("dead");
    return true;
  }else{
    return false;
  }
};


//particle * System * class
var ParticleSystem = function() {
  this.particles = [];
};
ParticleSystem.prototype.addParticle = function(){
  this.particles.push(new Particle());
}; //proto_add
ParticleSystem.prototype.run = function() {
  for (var i = this.particles.length - 1; i >= 0; i--) {
    var singleParticle = this.particles[i];
    singleParticle.display();
    if (singleParticle.isDead()) {
      this.particles.splice(i, 1);
    } //if
  }  //for
};  //proto_run
ParticleSystem.prototype.showLength = function(){
  // console.log(this.particles.length);
  fill(36+this.particles.length- random(2,-1),38+this.particles.length- random(2,-1),40+this.particles.length - random(2,-1));
  if(this.particles.length>0 && this.particles.length<=350){
    textSize(map(this.particles.length,0,350,15,20));
  }else if(this.particles.length>=351 && this.particles.length<=650){
  textSize(map(this.particles.length,351,650,21,28));
}else if(this.particles.length>=651&& this.particles.length<=950){
  textSize(map(this.particles.length,651,950,29,54));
}else{
  textSize(55);
}
text(this.particles.length, 50, 740-50, 70, 80);
textSize(10);
text("Taxi-on-Service" , 50, 710-50, 70, 80);
} //proto_showText
