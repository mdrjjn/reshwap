function run(){

  //grab user
  var ref = firebase.database();
  var email = firebase.auth().currentUser.uid;

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
