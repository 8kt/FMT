// Initialise global variables

// This comment was added by Joey to test commits.
// Everything Joey has edited is prefixed with "Joey" so just ctrl+f "Joey"

var currentPage = "login";
var status = "student";
var username = "";

// this is called when a student or teacher clicks the 'Log in to FMT' button
function login() {// Joey EDIT: Removed all function declarations from physically inside login()
  //check whether it is a student or teacher
  if (document.getElementById("student").checked) {
    status = "student";
  } else if (document.getElementById("teacher").checked) {
    status = "teacher";
  }
  //get values of username and password
  var username = document.getElementById("MISid").value;
  var password = document.getElementById("pwd").value;
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
    // Joey edit: GUARD CLAUSE - prevent further errors by prematurely exiting the function on bad argument
    if (!(status == "student" || status == "teacher")) {
      alert("Invalid member type!!!")
      return false; // prevent the function from further processing
    }
    // END Joey edit

    // If all necessary fields are not filled in. 
    // Joey edit: fixed a typo ("necesary" or smthn) in the above. im petty like that

    // Joey edit: this entire If block has been revamped due to an oversight in status checks and empty verification
    const studentFields = ["studentid","pwd1","pwd2","lastName","firstName","email"];// student field declaration - different from teachers 

    const teacherFields = ["teacherid","tpwd1","tpwd2","title","surname","staffroom"];// teacher field declaration - different from students

    // we can use ternary operators here since it makes sense:
    const fields = status === "student" ? studentFields : teacherFields; // fields = studentFields if status is "student" otherwise teacherfields

    if (fields.length === 0) { // assumes the status was neither student or teacher
      console.error("Invalid member status!"); // Please do some error checking, it is indeed good practice
      alert("An internal server error occurred!"); // TK, please either sanitize this in the PHP then return some markup to tell the user an error occurred
      return false; // exit the function prematurely
    } else { 
      const isEmpty = fields.some(field => { // find empty fields
        const value = document.getElementById(field).value;
        return value === ""; // returns boolean TRUE if value is empty (thats what === does compared to ==)
      }); 
    
      if (isEmpty) { // If we have at least one empty field as marked above, print the error
        alert("Please fill in all fields.");
      }
    }
    
    

    // if the passwords do not match
    const pwdType = status === "student" ? "pwd" : "tpwd"; // we don't need to check for a non-student/non-teacher since we already return the function above in this error case  
    if (
      document.getElementById(pwdType + "1").value != // for teachers, password is labelled tpwd1, tpwd2
      document.getElementById(pwdType + "2").value // and for students, password is labelled pwd1, pwd2
    ) {
      alert("Passwords do not match.");//alert with a warning message
    } 

    // END joey edits

    // Joey edit start: FIXED THIS ABSOLUTE MONSTER OF AN IF CHECK THAT MADE ME MAAAAD 
    const getElementValue = (id) => document.getElementById(id).value; // simplifying and compressing (this is a function, does exactly what you think it does)

    const isTeacher = (status === "teacher"); // is it a teacher - true if status is teacher
    const isStudent = !isTeacher; // when isTeacher is true, this is false and vice versa
    

    // I evenly aligned this for easy reading (and below code too)
    const username        = getElementValue(isTeacher ? "teacherid" : "studentid"); // both teacher and students have these attribs, but check what one
    const lastName        = getElementValue(isTeacher ? "surname" : "lastName"); // both teacher and students have these attribs, but check what one
    const password        = getElementValue(isTeacher ? "tpwd1" : "pwd1"); // both teacher and students have these attribs, but check what one
    // const confirmPassword = getElementValue(isTeacher ? "tpwd2" : "pwd2"); // both teacher and students have these attribs, but check what one (dont believe this is used but just in case i'll leave it here)
    const title           = isTeacher ? getElementValue("title") : ""; // only teachers have these attribs
    const staffroom       = isTeacher ? getElementValue("staffroom") : ""; // only teachers have these attribs
    const firstName       = isStudent ? getElementValue("firstName") : ""; // only students have these attribs
    const email           = isStudent ? getElementValue("email") : ""; // only students have these attribs
    const URL             = isTeacher ? "saveTeacher.php" : "saveStudent.php"; // if its a teacher, saveTeacher.php otherwise saveStudent.php

    // whatever URL does, TK, you need to implement this - unless you want me to do EVERYTHING (im fine doing im bored as heck)

    // NEVER APPEND URI QUERY PARMS LIKE username=username!!! this is unsafe!!! use username=encodeURIComponent(username)
    // this replaces "Hello World" to "Hello%20World" since spaces are unsafe in URIs!
    let strParameters  = "username="  + encodeURIComponent(username); // base params everyone has
        strParameters += "&password=" + encodeURIComponent(password);
        strParameters += "&lastName=" + encodeURIComponent(lastName);
    
    if (isTeacher) {
      strParameters += "&title="     + encodeURIComponent(title); // only teachers have this params
      strParameters += "&staffroom=" + encodeURIComponent(staffroom);
    } else {
      strParameters += "&firstName=" + encodeURIComponent(firstName); // only students have these (using else due to guard clause)
      strParameters += "&email="     + encodeURIComponent(email);
    }

    // END Joey edits


    // Joey comment: no idea what the hell the below code does. you're gonna have to fix this
    // SET objOptions TO
    var objOptions = {
      method: "post",  // Joey comment: FYI you're using post with query params (params in url) this isnt what post is, this is actually GET (and should NEVER EVER be used with forms unless you want the user to be able to see their password in the URL box which is the ultimate troll)
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

    // Joey comment: this does nothing and Ajax is literally not defined:
    // SET objRequest TO new Ajax request
    var objRequest = new Ajax.Request(URL, objOptions);
}

function saveSubject() {
  // SET thisSubject TO the value of the drop down list object
    thisSUbject = document.getElementById("subject").value;
    // SET URL TO saveSubject.php
    URL = saveSubject.php; // joey comment: saveSubject is this function not a variable! cause error because you are calling .php on it when its not a dictionary

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
    // Joey: Fixed the implementation and calling of this function. Didn't get called, think it was a typo. this is fixed.
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
} // Joey edit: fixed the braces mismatching using ESLint