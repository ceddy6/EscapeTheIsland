
<?php

    $name = $_GET['playerName'];
    $travel = $_GET['travelTime'];
    $puzzle = $_GET['puzzleTime'];
    $total = $_GET['totalTime'];

    echo json_encode("Player's name is " . $name);

?>