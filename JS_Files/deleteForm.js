//A function that is called form the MyForms page and is used to delete a selected form
function deleteForm (id){
  console.log(id);
  // taken from here: http://stackoverflow.com/questions/40474865/firebase-how-to-query-by-key
  firebase.database().ref('forms').child(id)
    .once('value')
    .then(function(snap) {

      //beginning to deal with the image
      var imgName = snap.val().imgName;
      if (imgName && imgName != "absent") {
        console.log("file to delete");
        var desertRef = firebase.storage().ref().child('images/'+imgName);
        // Delete the file
        desertRef.delete().then(function() {
          // File deleted successfully
        }).catch(function(error) {
          console.log(error);
        });
      }

      var ref = firebase.database().ref('forms')
      ref.child(id).remove();

      setTimeout(function() {
				displayMyForms(firebase.auth().currentUser.email);
			}, 200);

    });
}
