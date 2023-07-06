<?php
    extract($_REQUEST);
    session_start();
?>
<!DOCTYPE html>
<html>
<head>
	<title>Find My Teacher</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="author" content="pxlas0">
	
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">                            <!-- for BootStrap-->
    <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">      <!-- for Icons-->
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" >                                         <!-- for Icons-->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>                                        <!-- for jQuery-->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>            <!-- for BootStrap-->
    <script type="text/javascript" src="prototype.js"></script>
    <!-- for Ajax-->
    
    <script src="fmt.js"></script>
    <link rel="stylesheet" href="fmt.css">

</head>

<body>
    <div class="container">
        
        <div class="jumbotron center">
            <img src="owl.png" id="owl">
            <h1>List My Teachers</h1>
        </div>
        <div>
        <table>
            <tr>
                <th style="width:120px;">Subject code</th>
                <th style="width:120px;">Subject Name</th>
                <th style="width:120px;">Teacher Name</th>
                <th style="width:120px;">Staffroom</th>
                <th style="width:120px;">Email</th>
            </tr>
            <?php
                // connect to db
                include("connect.php");
                $userID = $_SESSION["userID"];

                // define sql statement to find subjects studied by this student
               $sqlListSubjects = "SELECT subjectCode FROM enrolments WHERE MISid='$userID'";
                // run query to list subjects and store result in $resSubjectsList
                $resSubjectsList = mysql_query($sqlListSubjects) or die(mysql_error());
                // while there are results, load sujbects into an array - $arrSubjects
                while ($arrSubjects = mysql_fetch_array($resSubjectsList)) {
                    $thisSubject = $arrSubjects[0];
                	//define sql statement to find the subject name and teacherID for this subject code
                	$sqlSubject = "SELECT * FROM subjects WHERE subjectCode='$thisSubject'";
                	// run query to get subject details
                	$resSubjDetails = mysql_query($sqlSubject) or die(mysql_error());
                	$arrDetails = mysql_query($sqlTeacher) or die(mysql_error());
                	$thisTeacher = $arrDetails[2];
                	//define sql statement to find the teacher details for this teacherID
		            $sqlTeacher = "SELECT * FROM teachers WHERE teacherID='$thisTeacher'";
                	// run query to get subject details
                	$resTeacher = mysql_query($sqlSubject) or die(mysql_error());
                	$arrTeacher = mysql_fetch_array($resTeacher);
                	// start a new html row
                    echo "<tr>";

                    // add a th with the subject code
                    echo "<th>" .$thisSubject. "</th>";
                    // add a td with the subject name
                    echo "<td>" .$arrDetails['subjectName']. "</td>";
                    // add a td with the teacher name
                    echo "<td>" .$arrTeacher['title']. "</td>";
                    // add a td with the staffroom	
                    echo "<td>" .$arrTeacher['staffroom']. "</td>";
                    // add a td with the email	
                    echo "<td>" .$arrTeacher['email']. "</td>";

                    // close the row tag
                    echo "</tr>\n";
                }
                ?>
           <!-- close the table -->     
            </table>
            </div>
            <hr>
            <button class="btn btn-secondary" id="btnExit" onclick="preExitApp()">Quit</button>
        </div>
</body>
</html>
