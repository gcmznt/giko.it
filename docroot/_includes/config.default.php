<?php

    // ** MySQL settings - You can get this info from your web host ** //
    /** The name of the database for WordPress */
    define('DB_NAME', 'database');

    /** MySQL database username */
    define('DB_USER', 'username');

    /** MySQL database password */
    define('DB_PASSWORD', 'password');

    /** MySQL hostname */
    define('DB_HOST', 'localhost');

    $silex['debug'] = false;

    $context['STATIC_URL'] = '/_static/';

    // $context['ga_account'] = 'your_analytics_id';
