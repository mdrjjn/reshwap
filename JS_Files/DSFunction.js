function DSFunction() {
  Parse.initialize("5Mt93UzpajJ9GdFOswxOvfGFuKzYILLERKPjlSaR", "YqQXgTXdkxON3cfQDquL9L8A783YyZd2Ahuhvz2K");

  var application = {
  			stickerId: document.getElementById("stickerInput").value //pass the sticker number as a string
  		};

  Parse.Cloud.run('sendEmailToUser', application);//assumes that we have email for each sticker, which we will

    alert("Thank you, the owner has been contacted"); //add UI so its easy to interact with
}
