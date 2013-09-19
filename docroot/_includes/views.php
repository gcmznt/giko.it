<?php

    use Symfony\Component\HttpFoundation\Request;
    use Symfony\Component\HttpFoundation\Response;


    $home = function () use ($silex, $twig, $context) {
        $lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
        switch ($lang){
            case "it":
                return $silex->redirect("/giacomozinetti/it/");
            case "en":
                return $silex->redirect("/giacomozinetti/en/");
            default:
                return $silex->redirect("/giacomozinetti/it/");
        }
    };

    $curriculum = function ($lang='') use ($silex, $twig, $context) {

        if ($lang == '') {
            $lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
            switch ($lang){
                case "it":
                    return $silex->redirect("/giacomozinetti/it/");
                case "en":
                    return $silex->redirect("/giacomozinetti/en/");
                default:
                    return $silex->redirect("/giacomozinetti/it/");
            }
        }

        $context['pagetitle'] = 'Curriculum Vitae';
        $context['title'] = "Curriculum Vitae";
        $context['section'] = 'giacomozinetti';
        $page = $twig->render("curriculum_" . $lang . ".html", $context);
        return new Response($page, 200);
    };

    $blog = function ($category='', $tag='', $search='') use ($silex, $twig, $context) {
        require_once(__DIR__ . '/../wordpress/wp-load.php');

        if ($tag != '') {
            $query = array(
                'order' => 'DESC',
                'orderby' => 'post_date',
                'tag' => $tag,
                'cat' => get_category_by_slug('web')->term_id,
            );
            $context['title'] = "<small>Posts about</small> " . $tag;
            $context['tag'] = $tag;
        } else if ($search != '') {
            $query = array(
                'cat' => get_category_by_slug('web')->term_id,
                's' => $search,
            );
            $context['title'] = "<small>Search results for</small> " . $search;
            $context['search'] = $search;
        } else {
            $query = array(
                'order' => 'DESC',
                'orderby' => 'post_date',
                'cat' => get_category_by_slug('web')->term_id,
            );
            $context['title'] = "Blog";
        }

        $context['tags'] = get_category_tags(get_category_by_slug('web')->term_id);
        $context['category'] = $category;
        $context['posts'] = get_context_post($query);
        $context['section'] = 'blog';

        $page = $twig->render("blog.html", $context);
        return new Response($page, 200);
    };

    $blogpost = function ($name = '') use ($silex, $twig, $context) {

        $context['posts'] = get_context_post(array(
            'name' => $name,
        ));

        $context['post'] = $context['posts'][0];
        $context['category'] = $context['post']['categories'][0]->name;
        $context['tags'] = get_category_tags(get_category_by_slug($context['category'])->term_id);
        $context['title'] = html_entity_decode($context['post']['title']);
        $context['mainimg'] = $context['category'];
        $context['section'] = 'blog';

        $page = $twig->render("blog-post.html", $context);
        return new Response($page, 200);
    };
