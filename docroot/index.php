<?php



    require_once(__DIR__ . '/_libs/silex/vendor/autoload.php');
    $silex = new Silex\Application();
    require_once(__DIR__ . '/_libs/twig/lib/Twig/Autoloader.php');
    Twig_Autoloader::register();
    $twig = new Twig_Environment(new Twig_Loader_Filesystem(__DIR__ . '/_templates'));


    $context = array();
    require_once(__DIR__ . '/_includes/config.php');
    require_once(__DIR__ . '/_includes/utilities.php');
    require_once(__DIR__ . '/_includes/views.php');


    // FRONTSITE
    $silex->get("/{category}/blog/s/{search}/", $blog);
    $silex->get("/{category}/blog/t/{tag}/", $blog);
    $silex->get("/{category}/blog/", $blog);
    $silex->get("/blog/", $blog);
    $silex->get("/web/portfolio/", $portfolio);
    $silex->get("/tchouk/eventi/", $eventi);
    $silex->get("/article/{name}/", $blogpost);
    $silex->get("/", $home);


    $silex->run();
