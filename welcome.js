$(document).ready(function(req,res){
  time();
  console.log("Add software to scan schedule and tell you what classes you have");
  console.log("Add software to save your entries to a database--> local database");
});

function time(){

  $("#clock").empty();

  var whole = new Date();
  var month = whole.getMonth()+1;
  var day = whole.getDate();
  var _day = whole.getDay();
  var hH = whole.getHours();//military time
  var mM = whole.getMinutes();
  var sS = whole.getSeconds();

  if(sS<10){
    sS= "0"+sS;
  }
  else if(mM <10){
    mM= "0"+mM;
  }

  if(hH>12){
    hH = hH-12;
    sS += " PM";
  }
  else if (hH==12){
    sS += " PM";
  }
  else if (hH==24){
    hH = hH-12;
    sS +=' AM';
  }
  else{
    sS += " AM";
  }

  // console.log(sS);

  var weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  $("#clock").append("<br><spam display= 'table-cell'>"+weekDay[_day]+"</spam><h5>"+month+"/"+day+
                      "</h5><spam display= 'table-cell'>"+hH+":"+mM+":"+sS+"</spam>");

setTimeout("time()", 500);

}
