//gets the specific form from the Upload page to edit.
function getThisForm(id) {
  $("#FormArea").empty();//empty everything to populate only with the update form
  formId = id;//this global variable is used in the Update function to find what form is being updated
  // taken from here: http://stackoverflow.com/questions/40474865/firebase-how-to-query-by-key
  firebase.database().ref('forms').child(id)
    .once('value')
    .then(function(snap) {

      console.log(snap.val());
      //getting the data from the search
      var title = snap.val().title;
      var description = snap.val().description;
      var id = snap.key;
      var ownername = snap.val().contactEmail;
      var downUrl = snap.val().downloadurl; //also used in updateForm(); to keep the file if it has not changed
      var category = snap.val().category;
      subject = snap.val().subject;
      courseName = snap.val().courseName;
      imgName = snap.val().imgName;//used to delete the image, if necessary, in updateForm();

      if (downUrl) {
        var filePresence = true;
      } else {
        var filePresence = false;
      }

      if (category == "Books") {
        var index = 1;
      };
      if (category == "Furniture") {
        var index = 2;
      };
      if (category == "Electronics") {
        var index = 3;
      };
      if (category == "Other") {
        var index = 4;
      };


      var UploadForm = document.createElement("FORM");
      UploadForm.className = "container";
      UploadForm.id = "form";
      //this thing here checks for the window size to decide what class to append.
      //UPDATE FROM 3/23/2016 The following if looks unnecessary!!
      if ($(window).width() < 768) {
        $(UploadForm).addClass('form-small');
        $(UploadForm).removeClass('form-big');
      } else {
        $(UploadForm).addClass('form-big');
        $(UploadForm).removeClass('form-small');
      }
      //finishing appending the class.
      document.getElementById("FormArea").appendChild(UploadForm);
      var divRow = document.createElement("DIV");
      divRow.className = "row";

      UploadForm.appendChild(divRow);
      var containerDiv = document.createElement("DIV");
      containerDiv.className = "col-lg-12 col-md-12 col-sm-12 col-xs-12";
      divRow.appendChild(containerDiv);
      //Creating Individual divs for the fieldsets
      var imgDiv = document.createElement("DIV");
      imgDiv.className = "col-lg-4 col-md-4 col-sm-4 col-xs-12";
      containerDiv.appendChild(imgDiv);
      //IMAGE FIELDSET
      var UploadPictureField = document.createElement("FIELDSET");
      UploadPictureField.id = "UploadPictureField";
      UploadPictureField.className = "field-bg uploadpicture col-lg-4 col-md-4 col-sm-4 col-xs-12";
      imgDiv.appendChild(UploadPictureField);
      var removeDiv = document.createElement("DIV");
      removeDiv.id = "removeDiv";
      UploadPictureField.appendChild(removeDiv);
      if (filePresence == true) {
        var removeButton = document.createElement("BUTTON");
        removeButton.id = "remove-file-btn";
        removeButton.className = "remove-file-btn";
        removeButton.type = "button";
        removeButton.addEventListener("click", removeFile);
        removeButton.innerHTML = "Remove file";
        removeDiv.appendChild(removeButton);
      }
      var fileInputContainingDiv = document.createElement("DIV");
      fileInputContainingDiv.innerHTML = "Upload Picture";
      fileInputContainingDiv.className = "buttonStyle";
      UploadPictureField.appendChild(fileInputContainingDiv);

      var InputPicture = document.createElement("INPUT");
      InputPicture.type = "file";
      InputPicture.id = "post-file";
      InputPicture.addEventListener("change", editPic);
      fileInputContainingDiv.appendChild(InputPicture);
      var UploadedPicture = document.createElement("IMG");
      UploadedPicture.id = "imageContainer"
      // UploadedPicture.id = "UploadedPicture";
      if (filePresence === true) {
        UploadedPicture.src = downUrl;
        UploadedPicture.name = "hasFile";//the names are used in the update form to figure out the presence of the file
      } else {
        UploadedPicture.src = "Images/no-file-uploaded.png";
        UploadedPicture.name = "noFile";
      }

      var pictureORcanvas = document.createElement("DIV"); //This is the div where the image or the canvas will go into.
      pictureORcanvas.id = "image-canvas-div";
      UploadPictureField.appendChild(pictureORcanvas);
      pictureORcanvas.appendChild(UploadedPicture);



      //Bootstrap div for category fieldset:
      var catDiv = document.createElement("DIV");
      catDiv.className = "col-lg-4 col-md-4 col-sm-4 col-xs-12";
      containerDiv.appendChild(catDiv);
      //GENERATE AN ARRAY OF SELECT OPTIONS FIELDSET
      var UploadCategoryField = document.createElement("FIELDSET");
      UploadCategoryField.className = "field-bg uploadcategory col-lg-4 col-md-4 col-sm-4 col-xs-12";
      catDiv.appendChild(UploadCategoryField);
      UploadCategoryField.id = "Uploadcategory";

      //creating a label for the category select option.
      var EnterCategory = document.createElement("LABEL");
      UploadCategoryField.appendChild(EnterCategory);

      //creating a select tag for the category options
      var SelectCategory = document.createElement("SELECT");
      EnterCategory.appendChild(SelectCategory);
      SelectCategory.id = "Category";

      //add an change event here
      SelectCategory.addEventListener("change", defineCat);

      var ChooseCat = document.createElement("OPTION");
      ChooseCat.innerHTML = "Select Category";
      SelectCategory.appendChild(ChooseCat);
      //Books
      var Books = document.createElement("OPTION");
      Books.innerHTML = "Books";
      SelectCategory.appendChild(Books);
      //Furnit
      var Furniture = document.createElement("OPTION");
      Furniture.innerHTML = "Furniture";
      SelectCategory.appendChild(Furniture);

      // Electro
      var Electronics = document.createElement("OPTION");
      Electronics.innerHTML = "Electronics";
      SelectCategory.appendChild(Electronics);
      // Others
      var Others = document.createElement("OPTION");
      Others.innerHTML = "Others";
      SelectCategory.appendChild(Others);
      //______Below set the default value of a category to the one specified previously in the form
      SelectCategory.selectedIndex = index;
      var categoryInvalidMessage = document.createElement("P");
      categoryInvalidMessage.id = "category-invalid-message";
      categoryInvalidMessage.style.color = "#ff0000";
      EnterCategory.appendChild(categoryInvalidMessage);

      //_______________________________


      //Creating the label where to put the invisible part of the form that is controlled by defineCat()
      var invisibleDiv = document.createElement("DIV");
      UploadCategoryField.appendChild(invisibleDiv);
      invisibleDiv.id = "invisibleDiv";
      invisibleDiv.className = "invisibleDiv";

      //creating a label for the subject select
      var EnterSubject = document.createElement("LABEL");
      invisibleDiv.appendChild(EnterSubject);

      // var apendlocation = document.getElementById("Uploadcategory");
      SelectSubject = document.createElement("SELECT");
      EnterSubject.appendChild(SelectSubject);
      SelectSubject.id = "SelectSubject";
      //creating options that will be apended to the subject selector
      var ChooseSubj = document.createElement("OPTION");
      ChooseSubj.innerHTML = "Select Subject";
      SelectSubject.appendChild(ChooseSubj);
      //English
      var English = document.createElement("OPTION");
      English.innerHTML = "English";
      SelectSubject.appendChild(English);
      //Mathematics
      var Mathematics = document.createElement("OPTION");
      Mathematics.innerHTML = "Mathematics";
      SelectSubject.appendChild(Mathematics);

      // Language
      var Language = document.createElement("OPTION");
      Language.innerHTML = "Language";
      SelectSubject.appendChild(Language);
      // Science
      var Science = document.createElement("OPTION");
      Science.innerHTML = "Science";
      SelectSubject.appendChild(Science);
      // History
      var history = document.createElement("OPTION");
      history.innerHTML = "History";
      SelectSubject.appendChild(history);
      // Interdisciplinary
      var Interdisciplinary = document.createElement("OPTION");
      Interdisciplinary.innerHTML = "Interdisciplinary";
      SelectSubject.appendChild(Interdisciplinary);
      // Religion and Philosophy
      var Religion_and_Philosophy = document.createElement("OPTION");
      Religion_and_Philosophy.innerHTML = "Religion and Philosophy";
      SelectSubject.appendChild(Religion_and_Philosophy);
      // Perfomring_Arts
      var Perfomring_Arts = document.createElement("OPTION");
      Perfomring_Arts.innerHTML = "Perfomring Arts";
      SelectSubject.appendChild(Perfomring_Arts);
      // Visual_Arts
      var Visual_Arts = document.createElement("OPTION");
      Visual_Arts.innerHTML = "Visual Arts";
      SelectSubject.appendChild(Visual_Arts);
      //Non-Course
      var non_Course = document.createElement("OPTION");
      non_Course.innerHTML = "Non-Course";
      SelectSubject.appendChild(non_Course);
      //_______Setting the vlue for the select tag.
      SelectSubject.value = subject;
      //creating the error message <p> tag
      var subjectInvalidMessage = document.createElement("P");
      subjectInvalidMessage.id = "subject-invalid-message";
      subjectInvalidMessage.style.color = "#ff0000";
      EnterSubject.appendChild(subjectInvalidMessage);
      //Creating the typeahead div
      var typeahead_Div = document.createElement("DIV");
      invisibleDiv.appendChild(typeahead_Div);
      typeahead_Div.id = "div_ChooseSubject";
      typeahead_Input = document.createElement("INPUT");
      typeahead_Div.appendChild(typeahead_Input);
      typeahead_Input.type = "text";
      typeahead_Input.id = "ChooseSubject";
      typeahead_Input.name = "edit";
      typeahead_Input.value = courseName;
      document.getElementById("ChooseSubject").className = "ChooseSubject";
      //course error message:
      var courseInvalidMessage = document.createElement("P");
      courseInvalidMessage.id = "course-invalid-message";
      courseInvalidMessage.style.color = "#ff0000";
      typeahead_Div.appendChild(courseInvalidMessage);

      // this calls on part of the function from the TypeaheadAutocomplete.js file but with different parameters.

      $('.ChooseSubject').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
      }, {
        name: 'courses',
        source: substringMatcher(courses)
      });

      document.getElementById("ChooseSubject").placeholder = "Type in a Course Name";
      defineCat(); //Check the category and decide if we are going to display the Books related hidden div or not

      // typeahead_Div.addEventListener("load", installTypeahead);


      //Bootstrap div for the describe fieldset:
      var descDiv = document.createElement("DIV");
      descDiv.className = "col-lg-4 col-md-4 col-sm-4 col-xs-12";
      containerDiv.appendChild(descDiv);
      //DESCRIBE ELEMENT FIELDSET
      var DescribeElement = document.createElement("FIELDSET");
      DescribeElement.className = "field-bg uploadtext col-lg-4 col-md-4 col-sm-4 col-xs-12";
      descDiv.appendChild(DescribeElement);
      var EnterTitle = document.createElement("LABEL");
      DescribeElement.appendChild(EnterTitle);
      var DescribeTitle = document.createElement("P");
      EnterTitle.appendChild(DescribeTitle);
      DescribeTitle.innerHTML = "Enter Title";
      var InputTitle = document.createElement("INPUT");
      InputTitle.type = "text";
      InputTitle.id = "Title";
      InputTitle.value = title;
      // console.log(title);
      EnterTitle.appendChild(InputTitle);
      //title invalid message <p> tag:
      var titleInvalidMessage = document.createElement("P");
      titleInvalidMessage.id = "title-invalid-message";
      titleInvalidMessage.style.color = "#ff0000";
      EnterTitle.appendChild(titleInvalidMessage);
      // Beginl Label3
      var EnterDescription = document.createElement("LABEL");
      DescribeElement.appendChild(EnterDescription);
      var DescribeDes = document.createElement("P");
      EnterDescription.appendChild(DescribeDes);
      DescribeDes.innerHTML = "Enter Description";
      var InputDescription = document.createElement("TEXTAREA");
      InputDescription.id = "Description";
      InputDescription.value = description;
      EnterDescription.appendChild(InputDescription);

      var submitNewFormButton = document.createElement("BUTTON");
      submitNewFormButton.innerHTML = "Submit";
      submitNewFormButton.type = "button";
      submitNewFormButton.className = "formButton";
      submitNewFormButton.addEventListener("click", updateForm);
      DescribeElement.appendChild(submitNewFormButton);


    });


}
