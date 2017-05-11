function logOut(){

  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    window.location.href = './index.html';
  }, function(error) {
    // An error happened.
    console.log("logout failed");
  });
}
