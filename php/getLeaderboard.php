<?php

    // Try running a db query
    $sql = 'SELECT * FROM leaderboard';
    $leaders = [];
    foreach ($conn->query($sql) as $row) {
        print $row['name'] . "\t";
        //$entry = array($row['name'],$row['puzzle_time'],$row['travel_time'],$row['total_time']);
        //$leaders[] = $entry;

        echo '<tr>';
        echo '<td> $row["name"]; </td>';
        echo '<td> $row["puzzle_time"]; </td>';
        echo '<td> $row["travel_time"]; </td>';
        echo '<td> $row["total_time"]; </td>';
        echo '</tr>';
    };

?>