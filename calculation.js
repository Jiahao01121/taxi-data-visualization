var fs = require('fs');
var data = JSON.parse(fs.readFileSync('01AM_AllData_for_calculation.json','utf8'));
var total = 0;

for (var i = 0; i < data.length; i++) {
  data[i].total_amount = +data[i].total_amount;
  total += data[i].total_amount
}
// console.log(typeof data[1].total_amount)
console.log(total);
