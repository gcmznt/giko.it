<?php
	require_once(__DIR__ . '/config.php');

	mysql_connect(DB_HOST, DB_USER, DB_PASSWORD) or die ('Errore di connessione al db');
	mysql_select_db(DB_NAME) or die ('Errore di selezione del db');
