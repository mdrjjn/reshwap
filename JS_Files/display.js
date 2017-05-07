
$(document).ready(function(){
  var config = {
          apiKey: "AIzaSyBjC0LvxiL8Epg-YO5ohd2ZBb_CdbkI8h4",
          authDomain: "reshwaptest.firebaseapp.com",
          databaseURL: "https://reshwaptest.firebaseio.com",
          storageBucket: "reshwaptest.appspot.com",
          messagingSenderId: "1083636691406"
      };
    firebase.initializeApp(config);
});

function findAndDisplay(category){
  var ref = firebase.database().ref("forms");

  ref.orderByChild('category').equalTo(category).on("child_added", function(snapshot) {
    console.log(snapshot.val().title);
  });

};


// var cat = $("#catChooser").val();
// var ref = firebase.database().ref("forms");
//   console.log("option "+cat);
//
// ref.orderByKey().endAt("1000").on("child_added", function(snapshot){
//   var option = snapshot.val();
//   console.log(option.category);
//
//   $("#FormArea").append("<div class= '"+option.category+" box'>"+option.contactEmail+"</div><br>");
//
// //give the option to hide things
//
//   if(cat == "Books"){
//     $(".Electronics").hide();
//     $(".Furniture").hide();
//     $(".Other").hide();
//   }
//   else if(cat == "Electronics"){
//     $(".Books").hide();
//     $(".Furniture").hide();
//     $(".Other").hide();
//   }
//   else if(cat == "Furniture"){
//     $(".Electronics").hide();
//     $(".Books").hide();
//     $(".Other").hide();
//   }
//   else if(cat == "Other"){
//     $(".Electronics").hide();
//     $(".Furniture").hide();
//     $(".Books").hide();
//   }
//   else{
//     console.log("give em everything");
//   }
//
//   });
