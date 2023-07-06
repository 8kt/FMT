<?php

// connect to database
include 'connect.php';
// extract variables from http request
extract($_REQUEST);

session_start();

$userID = $_SESSION["userID"];

// SET $sqlEditSubject TO UPDATE teacherID for this subjectCode
$sqlEditSubject = "UPDATE subjects SET teacherID='$userID' WHERE subjectCode='$subjectCode'";


// SET $resNewUSer TO RUN mysql_query with $sqlNewUser
$resNewUser = mysql_query($sqlEditSubject) or die(mysql_error());

// DISPLAY "details have been added"
echo "Details have been added."

?>