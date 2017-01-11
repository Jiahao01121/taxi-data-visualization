var data,
    bgMap,
    dataLength = 27960,
    iterator = 0,
    particleSystem = new ParticleSystem(),

    sx,
    sy,
    ex,
    ey,
    particleSequence,
    parLife,

    passenger_count,
    trip_distance,
    tip_amount,
    total_amount

    t = 1451628000000;
    var currency_text = 1,
        tips_text = 1
        people_text = 1;



function preload(){
  data = loadJSON("particleDataFeed.json");
  // geo = loadJSON('out.json')
  bgMap = loadJSON("out_new.json")
}

function setup() {
createCanvas(window.innerWidth,window.innerHeight);
}

var cofigMap =  () => {
  const context = d3.select('#defaultCanvas0').node().getContext('2d');
  var path = d3.geoPath().context(context);
  // context.strokeStyle = 'rgba(255,0,0,1)';
  context.beginPath();
  path(bgMap);
  context.stroke();
  context.closePath();
  context.fillStyle = `rgba(20, 20, 20, 1)`;
  context.fill();
}

function draw() {
//background color and map
  background(backgroundColor.background)
  cofigMap()
//timer
  if(speedGUI.speed ==1){s = new Date(t += 22 * speedGUI.speed);console.log("normalSpeed");}
  else{s = new Date(t += 20 * Math.round(speedGUI.speed+20));console.log("accelerated");}
  textSize(15);
  fill(255,255,255,200);
  text(s, 50, 50,200,800);
  noStroke();
//config particle/taxi, link to class particleSystem.
if(iterator < dataLength){
  try{
      sx = data[iterator].sx;
      sy = data[iterator].sy;
      ex = data[iterator].ex;
      ey = data[iterator].ey;
      particleSequence = data[iterator].Startvalue_ParticleSequence;
      parLife = data[iterator].value_ParticleLifeTime / 1800000;
      passenger_count = +data[iterator].passenger_count;
      trip_distance = data[iterator].trip_distance;
      tip_amount = +data[iterator].tip_amount;
      total_amount = +data[iterator].total_amount;
      function addwithsq (){
        console.log("new P");
      particleSystem.addParticle();
      iterator ++;
      }
      setTimeout(addwithsq, particleSequence / speedGUI.speed);
    }
    catch(err){
      iterator++;
    }
} //if
if(iterator > dataLength){
  console.log("end");
  iterator = 0;
}
// init particleSystem
particleSystem.run();

// particleSystem.showLength();
/***********************************************************************************************************/
//钱数
// function show_money_text(){
//   currency_text += total_amount;
// }
// setTimeout(show_money_text,particleSequence / speedGUI.speed);
// fill(255,255,255,map(currency_text,0,5000,0,255));
// textSize(10);
// text("Currency flow",470, 710-50, 230, 80);
//
// if(currency_text>0 && currency_text<1000){
//   textSize(map(currency_text,0,1000,15,20));
// }else if(currency_text>1001 && currency_text<5000){
// textSize(map(currency_text,1001,5000,21,31));
// }else if(currency_text>5001&& currency_text<30000){
// textSize(map(currency_text,5001,30000,32,54));
// }else{
// textSize(55);
// }
// text(`$${Math.round(currency_text)}`, 470, 740-50, 70, 80);
/***********************************************************************************************************/
//小费数
// function show_tips_text(){
//   tips_text += tip_amount;
// }
// setTimeout(show_tips_text,particleSequence / speedGUI.speed);
// fill(255,255,255,map(tips_text,0,500,0,255));
// textSize(10);
// text("Tips count",890, 710-50, 230, 80);
//
// if(tips_text>0 && tips_text<1000){
//   textSize(map(tips_text,0,1000,15,19));
// }else if(tips_text>1001 && tips_text<5000){
// textSize(map(tips_text,1001,5000,20,28));
// }else if(tips_text>5001&& tips_text<170000){
// textSize(map(tips_text,5001,17000,29,54));
// }else{
// textSize(55);
// }
// text(`$${Math.round(tips_text)}`, 890, 740-50, 70, 80);
/***********************************************************************************************************/
/***********************************************************************************************************/
//total carrying
// function show_people_text(){
//   people_text += passenger_count;
// }
// setTimeout(show_people_text,particleSequence / speedGUI.speed);
// fill(255,255,255,map(people_text,0,400,0,255));
// textSize(10);
// text("Total Carrying",1310, 710-50, 230, 80);
//
// if(people_text>0 && people_text<500){
//   textSize(map(people_text,0,500,15,19));
// }else if(people_text>501 && people_text<1000){
// textSize(map(people_text,501,1000,20,28));
// }else if(people_text>1001&& people_text<3000){
// textSize(map(people_text,1001,3000,29,54));
// }else{
// textSize(55);
// }
// text(`${people_text}`, 1310, 740-50, 70, 80);
/***********************************************************************************************************/
} //draw
