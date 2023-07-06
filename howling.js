// Initialise global variables

// This comment was added by Joey to test commits.

var currentPage = "login";
var status = "student";
var username = "";

// this is called when a student or teacher clicks the 'Log in to FMT' button
function login() {
  //check whether it is a student or teacher
  if (document.getElementById("student").checked) {
    status = "student";
  } else if (document.getElementById("teacher").checked) {
    status = "teacher";
  }
  //get values of username and password
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  // Assign PHP link depending on status
  if (status == "student") {
    var URL = "loginStudent.php";
  } else {
    var URL = "loginTeacher.php";
    // Set parameters to pass to either loginStudent or loginTeacher PHP file
    var strParameters = "username=" + username;
    strParameters = strParameters + "&password=" + password;

    // SET objOptions TO below - note it uses the "post" method for security
    var objOptions = {
      method: "post",
      parameters: strParameters,
      onSuccess: function (objXHR) {
        //if username and password not found, display error
        if (objXHR.responseText.indexOf("not found") > -1) {
          window.alert("Username/Password incorrect.");
        } else {
          //if teacher login exists, display listMySubjects.php
          if (status == "teacher") {
            document.getElementById("login").style.display = "none";
            document.location = "listMySubjects.php";
          } else {
            //if student login exists, display listTeachers.php
            if (status == "student") {
              document.getElementById("login").style.display = "none";
              document.location = "listTeachers.php";
            }
          }
        }
      },
    };
    // SET objRequest TO new Ajax request
    var objRequest = new Ajax.Request(URL, objOptions);
  }
  /* This function changes the display of the home page to either the student or teacher 'create account' sections based on the button that is clicked */
  function createAccount(status) {
    //change the display div
    document.getElementById("listTeach").style.display = "none";
    document.getElementById("addSubj").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("createS").style.display = "none";
    document.getElementById("createT").style.display = "none";
    document.getElementById("help").style.display = "none";
    document.getElementById("btnHelp").disabled = false;
    //if teacher, display create teacher div
    if (status == "teacher") {
      currentPage = "createT";
      document.getElementById("createT").style.display = "block";
    }
    //else display create student div
    else {
      currentPage = "createS";
      document.getElementById("createS").style.display = "block";
    }
  }
  /* This function will create both a student and teacher accounts as the status (student or teacher) is passed to the function from the html page. */
  function saveUser(status) {
    // If all neccessary fields are not filled in.
    if (
      document.getElementById("username").value == "" ||
      document.getElementById("pwd1").value == "" ||
      document.getElementById("pwd2").value == "" ||
      document.getElementById("lastName").value == "" ||
      document.getElementById("firstName").value == "" ||
      document.getElementById("email").value == "" ||
      document.getElementById("title").value == "" ||
      document.getElementById("staffroom").value == ""
    ) {
      // RUN alert with a warning message
      alert("Please fill in all fields.");
    }
    //if the passwords do not match
    if (
      document.getElementById("pwd1").value !=
      document.getElementById("pwd2").value
    ) {
      //alert with a warning message
      alert("Passwords do not match.");
    } else {
      //if this user is a teacher
      if (status == "teacher") {
        // SET username TO the value of the teacherid object
        username = document.getElementById("teacherid").value;

        // SET lastName TO the value of the lastName object
        lastName = document.getElementById("lastName").value;

        // SET password TO the value of the pwd1 object
        password = document.getElementById("pwd1").value;

        // SET confirmPassword TO the value of the pwd2 object
        confirmPassword = document.getElementById("pwd2").value;
        // SET title TO the value of the title object
        title = document.getElementById("title").value;
        // SET staffroom TO the value of the staffroom object
        staffroom = document.getElementById("staffroom").value;
        // SET URL TO saveTeacher.php
        URL = saveTeacher.php;
      }
      //else if this is a student
      else {
        // SET username TO the value of the studentid object
        username = document.getElementById("studentid").value;
        // SET lastName TO the value of the lastName object
        lastName = document.getElementById("lastName").value;
        // SET password TO the value of the pwd1 object
        password = document.getElementById("pwd1").value;
        // SET confirmPassword TO the value of the pwd2 object
        confirmPassword = document.getElementById("pwd2").value;
        // SET firstName TO the value of the firstName object
        firstName = document.getElementById("firstName").value;
        // SET email TO the value of the email object
        email = document.getElementById("email").value;
        // SET URL TO saveStudent.php
        URL = saveStudent.php;
      }

      // SET strParameters TO "username=" + username;
      strParameters = "username=" + username;
      // SET strParameters TO strParameters + "&password=" + password;
      strParameters = strParameters + "&password=" + password;
      // SET strParameters TO strParameters + "&lastName=" + lastName;
      strParameters = strParameters + "&lastName=" + lastName;

      //if this user is a teacher
      if (status == "teacher") {
        // SET strParameters TO strParameters + "&title=" + title;
        strParameters = strParameters + "&title=" + title;
        // SET strParameters TO strParameters + "&staffroom=" + staffroom;
        strParameters = strParameters + "&staffroom=" + staffroom;
      }
      //else if this is a student
      else {
        // SET strParameters TO strParameters + "&firstName=" + firstName;
        strParameters = strParameters + "&firstName=" + firstName;
        // SET strParameters TO strParameters + "&email=" + email;
        strParameters = strParameters + "&email=" + email;
      }

      // SET objOptions TO
      var objOptions = {
        method: "post",
        parameters: strParameters,
        onSuccess: function (objXHR) {
          // RUN alert with responseText
          alert(objXHR.responseText);
          // return to login page
          document.getElementById("createS").style.display = "none";
          document.getElementById("createT").style.display = "none";
          document.getElementById("login").style.display = "block";
        },
      };

      // SET objRequest TO new Ajax request
      var objRequest = new Ajax.Request(URL, objOptions);
    }
  }

  function saveSubject() {
    // SET thisSubject TO the value of the drop down list object
    thisSUbject = document.getElementById("subject").value;
    // SET URL TO saveSubject.php
    URL = saveSubject.php;

    // SET strParameters TO "subjectCode=" + thisSubject;
    strParameters = "subjectCode=" + thisSubject;

    // SET objOptions TO
    var objOptions = {
      method: "post",
      parameters: strParameters,
      onSuccess: function (objXHR) {
        // return to subject list page
        document.location = "listMySubjects.php";
      },
    };

    //SET objRequest TO new Ajax request
    var objRequest = new Ajax.Request(URL, objOptions);
  }

  function checkFields(thisStatus) {
    //if this user is a teacher
    if (thisStatus == "teacher") {
      // SET username TO the value of the teacherid object
      username = document.getElementById("teacherid").value;

      // SET lastName TO the value of the lastName object
      lastName = document.getElementById("lastName").value;

      // SET password TO the value of the pwd1 object
      password = document.getElementById("pwd1").value;

      // SET confirmPassword TO the value of the pwd2 object
      confirmPassword = document.getElementById("pwd2").value;
      // SET title TO the value of the title object
      title = document.getElementById("title").value;
      // SET staffroom TO the value of the staffroom object
      staffroom = document.getElementById("staffroom").value;
    }
    //else if this is a student
    else {
      // SET username TO the value of the studentid object
      username = document.getElementById("studentid").value;

      // SET lastName TO the value of the lastName object
      lastName = document.getElementById("lastName").value;

      // SET password TO the value of the pwd1 object
      password = document.getElementById("pwd1").value;

      // SET confirmPassword TO the value of the pwd2 object
      confirmPassword = document.getElementById("pwd2").value;

      // SET firstName TO the value of the firstName object
      firstName = document.getElementById("firstName").value;

      // SET email TO the value of the email object
      email = document.getElementById("email").value;
    }

    // SET blnChecksOut TO true
    var blnChecksOut = true;

    // IF username length < 1
    if (username.length < 1) {
      // SET blnChecksOut TO false
      blnChecksOut = false;
    }

    // IF lastName length < 1
    if (lastName.length < 1) {
      // SET blnChecksOut TO false
      blnChecksOut = false;
    }

    // IF password length < 1
    if (password.length < 1) {
      // SET blnChecksOut TO false
      blnChecksOut = false;
    }

    // IF confirmPassword length < 1
    if (confirmPassword.length < 1) {
      // SET blnChecksOut TO false
      blnChecksOut = false;
    }
    // IF thisStatus equals 'teacher'
    if (thisStatus == "teacher") {
      // IF title length < 1
      if (title.length < 1) {
        // SET blnChecksOut TO false
        blnChecksOut = false;
      }
      // IF staffroom length < 1
      if (staffroom.length < 1) {
        // SET blnChecksOut TO false
        blnChecksOut = false;
      }
    } else {
      // IF email length < 1
      if (email.length < 1) {
        // SET blnChecksOut TO false
        blnChecksOut = false;
      }
      // IF firstName length < 1
      if (firstName.length < 1) {
        // SET blnChecksOut TO false
        blnChecksOut = false;
      }
    }
    // RETURN blnChecksOut
    return blnChecksOut;
  }

  function checkPassword(thisStatus) {
    //if this user is a teacher
    if (thisStatus == "teacher") {
      //get the teacher password and confirm password
      document.getElementById("pwd1").value;
      document.getElementById("pwd2").value;
      //if the passwords do not match
      if (
        document.getElementById("pwd1").value !=
        document.getElementById("pwd2").value
      ) {
        //change the display for the confirm password box
        confirmtPassword.style.boxShadow = "0px 0px 4px red";
        //return false to indicate no match
        return false;
      }
      //else if passwords not at least 8 characters
      else if (document.getElementById("pwd1").value.length < 8) {
        confirmtPassword.style.boxShadow = "0px 0px 4px red";
        //return false
        return false;
      } else {
        confirmtPassword.style.boxShadow = "";
        return true;
      }
    } else {
      //get the student password and confirm password
      document.getElementById("pwd1").value;
      document.getElementById("pwd2").value;
      //if the passwords do not match
      if (
        document.getElementById("pwd1").value !=
        document.getElementById("pwd2").value
      ) {
        //change the display for the confirm password box
        confirmPassword.style.boxShadow = "0px 0px 4px red";
        //return false to indicate no match
        return false;
      }
      //else if passwords not at least 8 characters
      else if (document.getElementById("pwd1").value.length < 8) {
        confirmPassword.style.boxShadow = "0px 0px 4px red";
        // return false
        return false;
      } else {
        confirmPassword.style.boxShadow = "";
        //return true
        return true;
      }
    }
  }

  function showTeachers(thisUser) {
    // SET strParameters TO "username=" + username;
    var strParameters = "username=" + thisUser;
    //SET URL to listTeachers.php
    var URL = "listTeachers.php";

    // SET objOptions TO
    var objOptions = {
      method: "post",
      parameters: strParameters,
      onSuccess: function (objXHR) {
        // RUN alert with responseText
        //alert(objXHR.responseText);
        alert(objXHR.responseText);
        // return to login page
        document.getElementById("createS").style.display = "none";
        document.getElementById("createT").style.display = "none";
        document.getElementById("login").style.display = "block";
      },
    };

    // SET objRequest TO new Ajax request
    var objRequest = new Ajax.Request(URL, objOptions);
  }

  function addSubjects() {
    // SET subj1 TO the value of the subj1 object
    var subj1 = document.getElementById("subj1").value;
    // SET subj2 TO the value of the subj2 object
    var subj2 = document.getElementById("subj2").value;
    // SET subj3 TO the value of the subj3 object
    var subj3 = document.getElementById("subj3").value;
    // SET subj4 TO the value of the subj4 object
    var subj4 = document.getElementById("subj4").value;
    // SET subj5 TO the value of the subj5 object
    var subj5 = document.getElementById("subj5").value;
    // SET subj6 TO the value of the subj6 object
    var subj6 = document.getElementById("subj6").value;

    // SET strParameters TO "subj1=" + subj1;
    var strParameters = "username=" + username;
    // SET strParameters TO strParameters + "&password=" + password;
    strParameters += "&password=" + password;
  }

  function showHelp() {
    //change displays to help div
    document.getElementById("listTeach").style.display = "none";
    document.getElementById("addSubj").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("createS").style.display = "none";
    document.getElementById("createT").style.display = "none";
    document.getElementById("help").style.display = "block";
    document.getElementById("btnHelp").disabled = true;
  }

  function closeHelp() {
    //set help div to not display and go back to previous page
    document.getElementById("help").style.display = "none";
    if (currentPage == "listTeach") {
      document.getElementById("listTeach").style.display = "block";
    } else if (currentPage == "addSubj") {
      document.getElementById("addSubj").style.display = "block";
    } else if (currentPage == "createS") {
      document.getElementById("createS").style.display = "block";
    } else if (currentPage == "createT") {
      document.getElementById("createT").style.display = "block";
    } else {
      document.getElementById("login").style.display = "block";
    }
    document.getElementById("btnHelp").disabled = false;
  }

  function preExitApp() {
    //ask for confirmation
    if (confirm("Are you sure you want to exit the app?")) {
      exitApp();
    }
  }

  function exitApp() {
    //return to start page
    currentPage = "login";
    document.location = "fmt.html";
  }

  function showApp() {
    currentPage = "app";
    document.getElementById("app").style.display = "block";
    document.getElementById("login").style.display = "none";
    document.getElementById("createS").style.display = "none";
    document.getElementById("createT").style.display = "none";
    document.getElementById("help").style.display = "none";
    document.getElementById("btnHelp").disabled = false;
  }
}
