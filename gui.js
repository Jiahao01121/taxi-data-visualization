var gui = new dat.gui.GUI({
  width:270,
  height : 5 * 32 - 1
})

var speedGUI = {
    speed : 1,
    transparent_base_on_travel : true,

    R_arrive_color : 44,
    G_arrive_color : 234,
    B_arrive_color : 232,
    disable : false,
};

var ballSize = {
  // able :
  showTips : false,
  showTipsBaseOnSize : false,
  text_R : 242,
  text_G : 205,
  text_B : 80
}
var ballColor = {
  ball_R : 242,
  ball_G : 205,
  ball_B : 80
}
var passenger = {
  amount : false
}
var backgroundColor = {
  background : [ 0, 0, 0 ],
}

var mapColor = {
  map_R : 242,
  map_G : 205,
  map_B : 80,
  map_A :1
}

var f1 = gui.addFolder('Flow Field');
var f5 = gui.addFolder('ball color');

var f2 = gui.addFolder('Total service time');
var f3 = gui.addFolder('Arrive column');
var f4 = gui.addFolder('Size base on Tips');
/*********************/
var f6 = gui.addFolder('passenger_count');

var f7 = gui.addFolder('map_color');

gui.addColor(backgroundColor,'background')
f1.add(speedGUI,'speed',1,3000);

f5.add(ballColor,'ball_R',0,255);
f5.add(ballColor,'ball_G',0,255);
f5.add(ballColor,'ball_B',0,255);

f2.add(speedGUI,'transparent_base_on_travel');

f3.add(speedGUI,'disable')
f3.add(speedGUI,'R_arrive_color',0,255);
f3.add(speedGUI,'G_arrive_color',0,255);
f3.add(speedGUI,'B_arrive_color',0,255);

f4.add(ballSize,'showTips');
f4.add(ballSize,'showTipsBaseOnSize');
f4.add(ballSize,'text_R',0,255);
f4.add(ballSize,'text_G',0,255);
f4.add(ballSize,'text_B',0,255);
/*************************/
f6.add(passenger,'amount');

f7.add(mapColor,'map_R',0,255);
f7.add(mapColor,'map_G',0,255);
f7.add(mapColor,'map_B',0,255);
f7.add(mapColor,'map_A',0,1);
