
<?php

    $name = $_GET['playerName'];
    $travel = $_GET['travelTime'];
    $puzzle = $_GET['puzzleTime'];
    $total = $_GET['totalTime'];

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

    // Create the sql query
    $sql = "INSERT INTO leaderboard (name, travel_time, puzzle_time, total_time) VALUES (?,?,?,?)";
    $stmt= $conn->prepare($sql);
    $stmt->execute([$name, $travel, $puzzle, $total]);

    // Echo just to prove that things are working
    echo json_encode("Player's name is " . $name);

?>