<?php
session_start();
?>
<!DOCTYPE html>
<html>

<head>
	<title>Find My Teacher</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="author" content="pxlas0">

	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
	<!-- for BootStrap-->
	<link rel="stylesheet" type="text/css"
		href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css"> <!-- for Icons-->
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"> <!-- for Icons-->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script> <!-- for jQuery-->
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script> <!-- for BootStrap-->
	<script type="text/javascript" src="prototype.js"></script>
	<!-- for Ajax-->

	<script src="fmt.js"></script>
	<link rel="stylesheet" href="fmt.css">

</head>

<body>
	<div class="container">

		<div class="jumbotron center">
			<img src="owl.png" id="owl">
			<h1>Add subjects I teach</h1>
		</div>
		<div class="row">
			<div class="col-4"></div>
			<div class="col-4">
				<table>
					<tr>
						<th>
							Subject:
						</th>
						<td>
							<select name="lstSubjects" id="subject">
								<!-- this php code runs a SELECT query to find subjects that do not have a teacher - IS NULL - and puts it in a drop-down list <option> -->
								<?php
								// connect to db
								include("connect.php");
								// query to find any subjects that have no teachers assigned - IS NULL
								$query = "SELECT subjectCode FROM subjects WHERE teacherID IS NULL ORDER BY subjectCode";
								// run query
								$result = mysqli_query($query) or die(mysqli_error());
								// loop through results
								while ($aRecord = mysql_fetch_array($result)) {
									// put each subjectCode in an <option> tag
									echo ("<option value='" . $aRecord['subjectCode'] . "'>" . $aRecord['subjectCode'] . "</option>");
								}

								?>
							</select>
						</td>
					</tr>
					<tr>
						<td>
							<hr>
							<button class="btn btn-secondary" id="btnSave" onclick="saveSubject();">Save
								subject</button>
						</td>
					</tr>
				</table>
			</div>
			<div class="col-4"></div>
		</div>
	</div>
</body>

</html>