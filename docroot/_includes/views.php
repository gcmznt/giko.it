<?php

    use Symfony\Component\HttpFoundation\Request;
    use Symfony\Component\HttpFoundation\Response;



    $home = function () use ($silex, $twig, $context) {

        // if (isset($_GET['debug'])) {
        //     if ($_GET['debug'] == 'true') {
        //         $date_of_expiry = time() + 60 * 60 * 24 * 365 * 10;
        //         var_dump( setcookie("debug", "active", $date_of_expiry, "/", $_SERVER['SERVER_NAME']) );
        //     } else if ($_GET['debug'] == 'false') {
        //         $date_of_expiry = time() - 60;
        //         setcookie("debug", "active", $date_of_expiry, "/", "giko.it" );
        //     }
        // }

        require_once(__DIR__ . '/../wordpress/wp-load.php');

        $context['tags']['tchouk'] = get_category_tags(get_category_by_slug('tchouk')->term_id);
        $context['tags']['web'] = get_category_tags(get_category_by_slug('web')->term_id);
        $page = $twig->render("home.html", $context);
        return new Response($page, 200);
    };


    $blog = function ($category = '', $tag = '', $search = '') use ($silex, $twig, $context) {
        require_once(__DIR__ . '/../wordpress/wp-load.php');

        $context['mainimg'] = 'profile';

        if ($tag != '') {
            $query = array(
                'numberposts' => 10,
                'order' => 'DESC',
                'orderby' => 'post_date',
                'tag' => $tag,
                'cat' => get_category_by_slug($category)->term_id,
            );
            $context['pretitle'] = $tag;
            $context['filtertag'] = $tag;
        } else if ($search != '') {
            $query = array(
                'cat' => get_category_by_slug($category)->term_id,
                's' => $search,
            );
            $context['pretitle'] = 'Hai cercato ' . $search;
            $context['search'] = $search;
        } else {
            $query = array(
                'numberposts' => 10,
                'order' => 'DESC',
                'orderby' => 'post_date',
                'cat' => get_category_by_slug($category)->term_id,
            );
            $context['pretitle'] = '#' . $category . ' blog';
        }

        $context['tags'] = get_category_tags(get_category_by_slug($category)->term_id);
        $context['category'] = $category;
        $context['mainimg'] = $category;
        $context['posts'] = get_context_post($query);

        $page = $twig->render("blog.html", $context);
        return new Response($page, 200);
    };

    $blogpost = function ($name = '') use ($silex, $twig, $context) {

        $context['posts'] = get_context_post(array(
            'name' => $name,
        ));

        $context['category'] = $context['post']['categories'][0]->name;
        $context['tags'] = get_category_tags(get_category_by_slug($context['category'])->term_id);
        $context['post'] = $context['posts'][0];
        $context['pretitle'] = html_entity_decode($context['post']['title']);
        $context['mainimg'] = $context['category'];

        $page = $twig->render("blog-post.html", $context);
        return new Response($page, 200);
    };


