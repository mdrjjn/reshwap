function foundSticker(){

  var stickerNum = document.getElementById("stickerInput").value;
  var finderEmail = firebase.auth().currentUser.uid;
  var url = "https://reshwapfbcc.herokuapp.com/api/?id="+stickerNum+"&tid="+finderEmail;
  //If you want to run this locally, then replace everything following the '/api' with your local host address

  $.get(url, function(response){//Needs jquery to run. Do not forget to include cdn link in the js header of the page u are calling this function from
    alert(response);
    document.getElementById("stickerInput").value = "";//Empty the input field
    console.log(response);
  });


}
