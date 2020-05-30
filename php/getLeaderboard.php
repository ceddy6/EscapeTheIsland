<?php

    // Connect db
    $db = parse_url(getenv('DATABASE_URL'));
    $conn = new PDO("pgsql:" . sprintf(
        "host=%s;port=%s;user=%s;password=%s;dbname=%s",
        $db["host"],
        $db["port"],
        $db["user"],
        $db["pass"],
        ltrim($db["path"], "/")
    )); 

    // Try running a db query
    $sql = 'SELECT * FROM leaderboard';
    //$leaders = [];
    // foreach ($conn->query($sql) as $row) {
    //     echo '<tr>';
    //     echo '<td>' . $row["name"] . '</td>';
    //     echo '<td>' . $row["travel_time"] . '</td>';
    //     echo '<td>' . $row["puzzle_time"] . '</td>';
    //     echo '<td>' . $row["total_time"] . '</td>';
    //     echo '</tr>';
    // };

    foreach($conn->query($sql) as $row) {

        echo json_encode($row["name"]);

    }

    //echo json_encode("This is a test");

?>