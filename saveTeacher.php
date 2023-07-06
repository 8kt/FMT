<?php
// connect to database
include 'connect.php';
// extract variables from http request
extract($_REQUEST);

// SET $sqlNewUser TO SQL insert query with all fields
$sqlNewUser = "INSERT INTO teachers";
$sqlNewUser = "SET teacherID='$username'";
$sqlNewUser = "password='$password'";
$sqlNewUser = "title='$title'";
$sqlNewUser = "staffroom = '$staffroom'";
$sqlNewUser = "lastName ='$lastName'";


// SET $resNewUSer TO RUN mysql_query with $sqlNewUser
$resNewUser = mysql_query($sqlNewUser) or die(mysql_error());

// DISPLAY "Your account has been registered"
echo "Your account has been registered."

?>