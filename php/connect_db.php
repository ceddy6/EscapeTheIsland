
<?php

    $dsn = "pgsql:"
        . "host=ec2-54-75-246-118.eu-west-1.compute.amazonaws.com;"
        . "dbname=d7fgg9jaca0eio;"
        . "user=xsefhvcvgjlgtx;"
        . "port=5432;"
        . "sslmode=require;"
        . "password=fed355770cb4fecb884ea1ce5cfcded113339d2403d5e13088fc950bd18e4e63";

    $db = new PDO($dsn);

?>