<?php

    use Symfony\Component\HttpFoundation\Request;
    use Symfony\Component\HttpFoundation\Response;



    $home = function () use ($silex) {
        return $silex->redirect('/blog/');
    };


    $blog = function ($name = '') use ($silex, $twig, $context) {
        require_once(__DIR__ . '/../wordpress/wp-load.php');

        $context['posts'] = get_context_post(array(
            'numberposts' => 10,
            'order' => 'DESC',
            'orderby' => 'post_date',
            'cat' => get_category_by_slug($name)->term_id,
        ));

        $context['category'] = $name;
        $page = $twig->render("blog.html", $context);
        return new Response($page, 200);
    };

    $blogpost = function ($name = '') use ($silex, $twig, $context) {

        $context['posts'] = get_context_post(array(
            'name' => $name,
        ));

        $context['post'] = $context['posts'][0];
        $context['category'] = $context['post']['categories'][0]->name;
        $page = $twig->render("blog-post.html", $context);
        return new Response($page, 200);
    };

    $blogtag = function ($name = '') use ($silex, $twig, $context) {

        $context['posts'] = get_context_post(array(
            'numberposts' => 10,
            'order' => 'DESC',
            'orderby' => 'post_date',
            'tag' => $name,
        ));

        $context['tag'] = $name;
        $page = $twig->render("blog.html", $context);
        return new Response($page, 200);
    };


