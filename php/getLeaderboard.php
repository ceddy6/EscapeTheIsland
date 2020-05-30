<?php

    // Try running a db query
    $sql = 'SELECT * FROM leaderboard';
    foreach ($conn->query($sql) as $row) {
        print $row['name'] . "\t";
    };
    
?>