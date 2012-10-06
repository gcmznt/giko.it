<?php

    use Symfony\Component\HttpFoundation\Request;
    use Symfony\Component\HttpFoundation\Response;



    $home = function () use ($silex) {
        return $silex->redirect('/blog/');
    };


    $blog = function ($category = '', $tag = '') use ($silex, $twig, $context) {
        require_once(__DIR__ . '/../wordpress/wp-load.php');

        $context['mainimg'] = 'profile';

        if ($category != '') {
            $query = array(
                'numberposts' => 10,
                'order' => 'DESC',
                'orderby' => 'post_date',
                'cat' => get_category_by_slug($category)->term_id,
            );
            $context['category'] = $category;
            $context['mainimg'] = $category;
        } else if ($tag != '') {
            $query = array(
                'numberposts' => 10,
                'order' => 'DESC',
                'orderby' => 'post_date',
                'tag' => $tag,
            );
            $context['filtertag'] = $tag;
        }

        $context['posts'] = get_context_post($query);

        $page = $twig->render("blog.html", $context);
        return new Response($page, 200);
    };

    $blogpost = function ($name = '') use ($silex, $twig, $context) {

        $context['posts'] = get_context_post(array(
            'name' => $name,
        ));

        $context['post'] = $context['posts'][0];
        $context['category'] = $context['post']['categories'][0]->name;
        $context['pretitle'] = html_entity_decode($context['post']['title']);
        $context['mainimg'] = $context['category'];

        $page = $twig->render("blog-post.html", $context);
        return new Response($page, 200);
    };


