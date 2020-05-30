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
    $sql = 'SELECT * FROM leaderboard ORDER BY total_time ASC;';
    $leaders = [];

    foreach($conn->query($sql) as $row) {

        $player = array($row['name'],$row['travel_time'],$row['puzzle_time'],$row['total_time'],$row['hints_used']);
        $leaders[] = $player;

    }

    echo json_encode($leaders);

?>