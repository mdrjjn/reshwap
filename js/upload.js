function run(){

  //grab user
  var ref = new Firebase('https://reshwaptest.firebaseio.com');
  var email = ref.getAuth().password.email;

  //makes sure all fields needed are there

  //make photo small

  var entry ={
        user: email,
        category: $("#category").val(),
        title: $("#title").val(),
        describe: $("#describe").val()
      };

    console.log(entry);

  //post entry


}
