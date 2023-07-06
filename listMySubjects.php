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
            <h1>List My Subjects</h1>
        </div>
        <div class="row">
            <div class="col-4"></div>
            <div class="col-4">
                <table>
                    <tr>
                        <th style="width:120px;">Subject code</th>
                        <th>Subject Name</th>
                    </tr>
                    <?php
                        // connect to db
                        include("connect.php");
                        $userID = $_SESSION["userID"];
        
                        // define sql statement to find subjects studied by this student
                        $sqlListSubjects = "SELECT * FROM subjects WHERE teacherID = '$userID'";
                        // run query to list subjects
                        $resSubjectsList = mysql_query($sqlListSubjects) or die(mysql_error());
                        // while there are results 
                        while ($arrSubjects = mysql_fetch_array($resSubjectsList)) {
        
                        	// start a new html row
                            echo "<tr>";
        
                            // add a th with the subject code
                            echo "<th>".$arrSubjects[0]."</th>";
                            // add a td with the subject name
                            echo "<td>".$arrSubjects[1]."</td>";
        
        
                            // close the row tag
                            echo "</tr>\n";
                        }
                    ?>
               <!-- close the table -->     
                </table>
                <hr>
                <button class="btn btn-secondary" id="btnAdd" onclick="location.href='addSubjects.php'">Add subject</button>
                <button class="btn btn-secondary" id="btnExit" onclick="preExitApp()">Quit</button>
            </div>
            <div class="col-"></div>
        </div>
    </div>
</body>
</html>
