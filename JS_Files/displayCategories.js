//Find forms for display pages and print them to the requested pages
function findAndDisplay(category) { //mf stands for my forms. Is a boolean

  $("#FormArea").empty(); //Clear anything that would be inside the FormArea div.
  $("#noResultsFound").empty();
  divRow = document.createElement("DIV");
  divRow.className = "row row-centered";
  divRow.id = "row-centered";
  document.getElementById("FormArea").appendChild(divRow);
  var ref = firebase.database().ref("forms");
  if (category === "Books") {
    var subject = document.getElementById("ChSubject").value;
    var course = ""//document.getElementById("ChooseSubject").value;
  }

  ref.orderByChild('category').equalTo(category).on("child_added", function(snap) {

    //getting the data from the search
    var title = snap.val().title;
    var description = snap.val().description;
    var id = snap.key;
    var ownername = snap.val().contactEmail;
    var downUrl = snap.val().downloadurl;

    if (category === "Books") {
      //this giant if says print if both course and subject match
      if (subject != "Choose Subject" && subject === snap.val().subject && course != "" && course === snap.val().courseName) {
        printTheForm(title, description, id, ownername, downUrl);
      } else if (subject != "Choose Subject" && subject === snap.val().subject) {
        printTheForm(title, description, id, ownername, downUrl);
      } else if (course != "" && course === snap.val().courseName) {
        printTheForm(title, description, id, ownername, downUrl);
      } else if (subject === "Select Subject" && course === "") {
        printTheForm(title, description, id, ownername, downUrl);
      }
    } else {
      printTheForm(title, description, id, ownername, downUrl);
    }

  });

};

function printTheForm(title, description, id, ownername, downUrl) {

  if (downUrl) {
    var filePresence = true;
  } else {
    var filePresence = false;
  }

  //Create and populate the html form
  var UploadForm = document.createElement("FORM");
  UploadForm.className = "display-form col-lg-4 col-md-6 col-sm-6 col-xs-12";
  UploadForm.id = "form";
  divRow.appendChild(UploadForm);
  //Dealing with image

  //Display Image element being created:
  var UploadPictureField = document.createElement("IMG");
  UploadPictureField.className = "field-bg uploadpicture";
  UploadForm.appendChild(UploadPictureField);
  // var InputPicture = document.createElement("IMG");
  //InputPicture.id ="displayImage";
  if (filePresence === true) {
    UploadPictureField.src = downUrl;
  } else {
    UploadPictureField.src = 'Images/no-file-uploaded.png';
  }

  //Display text info fieldset being creted:
  var DescribeElement = document.createElement("FIELDSET");
  DescribeElement.className = "field-bg uploadcategory";

  UploadForm.appendChild(DescribeElement);
  //BeginLabel1
  //describe the title display tag:
  var titleDescriptionTag = document.createElement("P");
  titleDescriptionTag.innerHTML = "Title:";
  titleDescriptionTag.className = "descriptionP";
  DescribeElement.appendChild(titleDescriptionTag);

  var ChooseCategory = document.createElement("LABEL");
  ChooseCategory.style.height = "40px";
  DescribeElement.appendChild(ChooseCategory);
  var DescribeCat = document.createElement("P");
  DescribeCat.className = "stylingDisplayP";
  ChooseCategory.appendChild(DescribeCat);
  DescribeCat.innerHTML = title;

  //describe the descriptiondisplay tag:
  var descriptionDescriptionTag = document.createElement("P");
  descriptionDescriptionTag.innerHTML = "Description:";
  descriptionDescriptionTag.className = "descriptionP";
  DescribeElement.appendChild(descriptionDescriptionTag);
  // Beginl Label2
  var EnterTitle = document.createElement("LABEL");
  DescribeElement.appendChild(EnterTitle);
  var DescribeTitle = document.createElement("P");
  DescribeTitle.className = "stylingDisplayP";
  DescribeTitle.id = "insideScrollingTextDisplay";
  EnterTitle.appendChild(DescribeTitle);
  DescribeTitle.innerHTML = description;

  //creating a label for the contact button.
  var contactLabel = document.createElement("LABEL");
  DescribeElement.appendChild(contactLabel);

  //Creating a button
  var contactButton = document.createElement("BUTTON");
  contactButton.id = "contactButton";
  contactButton.className = "formButton";
  contactButton.type = "button";
  contactLabel.appendChild(contactButton);
  //creating an anchor inside the button.
  var contactAnchor = document.createElement("A");

  contactAnchor.href = "mailto:" + ownername + "?Subject=Hey,%20I%20am%20interested%20in%20that%20" + title + "%20you%20got%20there"; //here I set the gref along with the email adress and the subject
  contactAnchor.innerHTML = "Contact the owner";
  contactAnchor.id = "contactAnchor";
  contactAnchor.className = "contactAnchor";
  contactButton.appendChild(contactAnchor);
  //    }


}
