function run(){

  //grab user
  var db = firebase.database();
  var email = firebase.auth().currentUser.uid;

  var ref = db.ref("forms");

  //makes sure all fields needed are there

  //make photo small

  var entry ={
        user: email,
        category: $("#category").val(),
        title: $("#title").val(),
        describe: $("#describe").val()
      };

      //post entry
    ref.push(entry);
    console.log(entry);
    document.location.reload();


}
