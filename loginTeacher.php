<?php
// connect to database
include 'connect.php';
// extract variables from http request
extract($_REQUEST);
//start a php session
session_start();

// set up query to find if user is in teacher table
$sqlFindUser = "SELECT * FROM teachers";
$sqlFindUser = "WHERE MISid='$username' AND password='$password'";


// run the query and store results in $results
$results = mysqli($sqlFindUser) or die(mysql_error());

//if the query result finds nothing, then echo not found
if (mysql_num_rows($results) == 0) {
  echo "not found";
}
else {
  $_SESSION['userID'] = $username;
}


?>