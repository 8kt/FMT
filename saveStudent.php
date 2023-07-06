<?php
// connect to database
include 'connect.php';
// extract variables from http request
extract($_REQUEST);

// SET $sqlNewUser TO SQL insert query with all fields
$sqlNewUser = "INSERT into students";
$sqlNewUser = "SET MISid='$username'";
$sqlNewUser = "password='$password'";
$sqlNewUser = "firstName='$firstName'";
$sqlNewUser = "lastName='$lastName'";
$sqlNewUser = "email='$email'";
// SET $resNewUSer TO RUN mysql_query with $sqlNewUser
$resNewUser = mysql_query($sqlNewUser) or die(mysql_error());

// DISPLAY "Your account has been registered"
echo "Your account has been registered.";

?>